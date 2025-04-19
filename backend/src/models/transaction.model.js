import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type :{
        type: String,
        enum: ["DEBIT", "CREDIT"],
        required: true,
    }
}, { timestamps: true});

export const Transaction = mongoose.model("Transaction", transactionSchema)