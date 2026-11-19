import mongoose from "mongoose";

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

export default async function dbConnect() {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not configured");
    }

    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000,
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null; // allow retry
        throw e;
    }
    return cached.conn;
}