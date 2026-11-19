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
            const dnsOptions = [
                ["8.8.8.8", "1.1.1.1"],
                ["1.1.1.1", "8.8.8.8"],
            ];

            for (const servers of dnsOptions) {
                try {
                    dns.setServers(servers);
                    return await mongoose.connect(process.env.MONGO_URI, {
                        bufferCommands: false,
                        serverSelectionTimeoutMS: 10000,
                        connectTimeoutMS: 10000,
                    });
                } catch (error) {
                    lastError = error;
                }
            }

            dns.setServers();
            return mongoose.connect(process.env.MONGO_URI, {
                bufferCommands: false,
                serverSelectionTimeoutMS: 10000,
                connectTimeoutMS: 10000,
            }).catch((error) => {
                throw lastError || error;
            });
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