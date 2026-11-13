import nextEnv from "@next/env";
import dns from "node:dns";
import mongoose from "mongoose";

const { loadEnvConfig } = nextEnv;

// Load .env and .env.local from project root
loadEnvConfig(process.cwd());

// Configure DNS
dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function testConnection() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not loaded");
        }

        console.log("Testing MongoDB connection...");

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("MongoDB connected successfully!");
        console.log("Connected host:", mongoose.connection.host);

    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
}

testConnection();