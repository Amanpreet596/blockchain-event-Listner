import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    wallet_address: { type: String, required: true }
});

export const User = mongoose.model('User', userSchema); 