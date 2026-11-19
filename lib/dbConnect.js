import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]); // runs before any connect
const dnsServers = ["8.8.8.8", "1.1.1.1"];

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

async function connectWithDnsFallback() {
    let lastError;

    for (const server of dnsServers) {
        dns.setServers([server]);
        try {
            return await mongoose.connect(process.env.MONGO_URI, { bufferCommands: false });
        } catch (error) {
            lastError = error;
            if (error.code !== "ECONNREFUSED" || error.syscall !== "querySrv") {
                throw error;
            }
        }
    }

    throw lastError;
}

export default async function dbConnect() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = connectWithDnsFallback();
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null; // allow retry
        throw e;
    }
    return cached.conn;
}