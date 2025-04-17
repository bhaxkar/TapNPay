import mongoose from "mongoose"
import { Account } from "../models/account.model.js"

export const getBalance = async(req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId,
        })

        res.status(200).json({
            balance: account.balance,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get balance"
        })
    }
};

export const transferFund = async(req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const { amount, to } = req.body;
        if (!amount || !to) {
            return res.status(400).json({
                message: "Both amount and recipient id are required"
            });
        }

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({
                message: "Invalid amount"
            });
        }

        if (to === req.userId) {
            return res.status(400).json({
                message: "Cannot transfer to your own account"
            });
        };
        
        const account = await Account.findOne({
            userId: req.userId,
        }).session(session);
    
        if( !account || account.balance < amount ){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient Balance"
            })
        }
    
        const toAccount = await Account.findOne({
            userId: to,
        }).session(session)
    
        if( !toAccount ){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid Account"
            })
        }
        
    
        await Account.updateOne({
            userId: req.userId
        }, {
            $inc:{
                balance: -amount
            }
        }).session(session)
    
        await Account.updateOne({
            userId: to
        },{
            $inc: {
                balance: amount,
            }
        }).session(session)
        
        await session.commitTransaction();
        return res.status(200).json({
            message: "Amount Tranfered Successfully"
        })
    } catch (error) {
        await session.abortTransaction();
        console.error("Transfer error:", error);
        return res.status(500).json({
            message: "Transfer failed"
        });   
    } finally{
        session.endSession();
    }
};

