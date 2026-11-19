
import user from "@/models/user";
import dbConnect from "@/lib/dbConnect";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    // Establish MongoDB connection first
    await dbConnect();

    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        msg: "Name and email are required",
      });
    }

    // Check existing user
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    // Generate OTP
    const Email_otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.user,
        pass: process.env.password,
      },
    });

    // Send OTP
    await transporter.sendMail({
      from: process.env.user,
      to: email,
      subject: "OTP verification for your account",
      html: `<p>Hi ${name}, your OTP is ${Email_otp}</p>`,
    });

    // Store OTP in cookie
    res.setHeader(
      "Set-Cookie",
      `emailOtp=${Email_otp}; HttpOnly; Path=/; Max-Age=300; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`
    );

    return res.status(200).json({
      success: true,
      msg: "OTP successfully sent",
    });

  } catch (error) {
    console.error("Signup API error:", error);

    return res.status(500).json({
      success: false,
      msg: error.message || "Signup failed",
    });
  }
}
