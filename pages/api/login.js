// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import user from "@/models/user"
import connectDb from "@/middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async(req,res)=>{
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    if (!process.env.JWT_SECRET || !process.env.JWT_KEY) {
        console.error("Login configuration is missing JWT_SECRET or JWT_KEY");
        return res.status(500).json({ success: false, error: "Server configuration error" });
    }

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const u = await user.findOne({ email });
        if (!u) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const bytes = CryptoJS.AES.decrypt(u.password, process.env.JWT_SECRET);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        if (email !== u.email || password !== originalText) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { email: u.email, name: u.name },
            process.env.JWT_KEY,
            { expiresIn: "7d" }
        );
        return res.status(200).json({ success: true, token });
    } catch (error) {
        console.error("Login failed:", error);
        return res.status(500).json({ success: false, error: "Login failed" });
    }
}

export default connectDb(handler)
  