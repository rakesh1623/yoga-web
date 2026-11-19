import mongoose from "mongoose";
import dns from "node:dns";

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

export default async function dbConnect() {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not configured");
    }

    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = (async () => {
            let lastError;

            for (const servers of [["8.8.8.8", "1.1.1.1"], ["1.1.1.1"], []]) {
                try {
                    if (servers.length > 0) {
                        dns.setServers(servers);
                    }
                    return await mongoose.connect(process.env.MONGO_URI, {
                        bufferCommands: false,
                        serverSelectionTimeoutMS: 10000,
                    });
                } catch (error) {
                    lastError = error;
                }
            }

            throw lastError;
        })();
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null; // allow retry
        throw e;
    }
    return cached.conn;
}