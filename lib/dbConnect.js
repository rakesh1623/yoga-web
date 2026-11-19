
import mongoose from "mongoose";

let cached = global._mongoose;

if (!cached) {
    cached = global._mongoose = {
        conn: null,
        promise: null,
    };
}

export default async function dbConnect() {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        throw new Error("MONGO_URI is not configured");
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;

        console.error("MongoDB connection failed:", {
            name: error.name,
            message: error.message,
        });

        throw error;
    }

    return cached.conn;
}
