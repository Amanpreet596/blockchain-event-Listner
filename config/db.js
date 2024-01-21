import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const dbURI = process.env.DB_URI;

const connectToDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log("Connected to mongoDb");
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

connectToDB();
export { connectToDB };