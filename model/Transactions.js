import mongoose from "mongoose";

const trsansacionSchema = new mongoose.Schema({
    txn_hash: { type: String, required: true },
    fromAddress: { type: String, required: true },
    toAddress: { type: String, required: true }
});

export const Transaction = mongoose.model('Transaction', trsansacionSchema);