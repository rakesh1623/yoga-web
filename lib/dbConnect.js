
import mongoose from "mongoose";
import dns from "node:dns";

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
        const connectionOptions = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
        };

        if (process.env.VERCEL) {
            cached.promise = mongoose.connect(MONGO_URI, connectionOptions);
        } else {
            cached.promise = (async () => {
                let lastError;

                for (const servers of [["8.8.8.8", "1.1.1.1"], ["1.1.1.1", "8.8.8.8"]]) {
                    try {
                        dns.setServers(servers);
                        return await mongoose.connect(MONGO_URI, connectionOptions);
                    } catch (error) {
                        lastError = error;
                        if (error.code !== "ECONNREFUSED" && error.syscall !== "querySrv") {
                            throw error;
                        }
                    }
                }

                throw lastError;
            })();
        }
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
