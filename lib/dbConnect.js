import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]); // runs before any connect

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

export default async function dbConnect() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose
            .connect(process.env.MONGO_URI, { bufferCommands: false })
            .then((m) => m);
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null; // allow retry
        throw e;
    }
    return cached.conn;
}