import mongoose from "mongoose";
import { Account } from "../models/account.model.js";
import { Transaction } from "../models/transaction.model.js";

export const getBalance = async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    res.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get balance",
    });
  }
};

export const transferFund = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { amount, to, note } = req.body;
    if (!amount || !to) {
      return res.status(400).json({
        message: "Both amount and recipient id are required",
      });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        message: "Invalid amount",
      });
    }

    if (to === req.userId) {
      return res.status(400).json({
        message: "Cannot transfer to your own account",
      });
    }

    const account = await Account.findOne({
      userId: req.userId,
    }).session(session);

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient Balance",
      });
    }

    const toAccount = await Account.findOne({
      userId: to,
    }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid Account",
      });
    }

    const transactions = await Transaction.create(
      [
        {
          fromUser: req.userId,
          toUser: to,
          amount,
          note,
          type: "DEBIT",
        },
        {
          fromUser: req.userId,
          toUser: to,
          amount,
          note,
          type: "CREDIT",
        },
      ],
      { session, ordered: true }
    );

    await Account.updateOne(
      {
        userId: req.userId,
      },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);

    await Account.updateOne(
      {
        userId: to,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);

    await session.commitTransaction();
    return res.status(200).json({
      message: "Amount Tranfered Successfully",
      transactionId: transactions[0]._id,
      amount,
      recipient: to,
      note,
      timestamp: transactions[0].createdAt,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Transfer error:", error);
    return res.status(500).json({
      message: "Transfer failed",
    });
  } finally {
    session.endSession();
  }
};

export const getTransactionDetails = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId)
      .populate("fromUser", "firstName lastName")
      .populate("toUser", "firstName lastName");

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    if (
      transaction.fromUser._id.toString() !== req.userId &&
      transaction.toUser._id.toString() !== req.userId
    ) {
      return res.status(401).json({
        message: "Unauthorized to view this transaction",
      });
    }

    return res.status(200).json({
      id: transaction._id,
      amount: transaction.amount,
      type: transaction.type,
      note: transaction.note,
      fromUser: `${transaction.fromUser.firstName} ${transaction.fromUser.lastName}`,
      toUser: `${transaction.toUser.firstName} ${transaction.toUser.lastName}`,
      timestamp: transaction.createdAt,
    });
  } catch (error) {
    console.error("Transaction details error:", error);
    return res.status(500).json({
      message: "Failed to fetch transaction details",
    });
  }
};

export const getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find(req.queryFilter)
      .populate("fromUser", "firstName lastName")
      .populate("toUser", "firstName lastName")
      .sort({ createdAt: -1 })
      .skip(req.pagination.skip)
      .limit(req.pagination.limit);

    return res.status(200).json({
      ...req.pageInfo,
      transactions: transactions.map((transaction) => ({
        id: transaction._id,
        amount: transaction.amount,
        type: transaction.type,
        note: transaction.note,
        fromUser: `${transaction.fromUser.firstName} ${transaction.fromUser.lastName}`,
        toUser: `${transaction.toUser.firstName} ${transaction.toUser.lastName}`,
        timestamp: transaction.createdAt,
      })),
    });
  } catch (error) {
    console.error("Transaction history error:", error);
    return res.status(500).json({
      message: "Failed to fetch transaction history",
    });
  }
};