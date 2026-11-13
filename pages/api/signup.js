import user from "@/models/user";
import connectDb from "@/middleware/mongoose";
import nodemailer from "nodemailer";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, email} = req.body;

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    try {
        const Email_otp = Math.floor(100000 + Math.random() * 900000).toString();
        res.setHeader('Set-Cookie', `emailOtp=${Email_otp}; HttpOnly; Path=/`);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.user,
          pass: process.env.password,
        },
      });

      const mailOptions = {
        from: process.env.user,
        to: email,
        subject: "OTP verification for your account.",
        html: `<p>Hiii ${name}. Your OTP is ${Email_otp}</p>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.status(500).json({ success: false, msg: error.message });
        } else {
          return res.status(200).json({ success: true, msg: "Mail successfully sent" });
        }
      });
    } catch (error) {
      res.status(400).json({ success: false, msg: error.message });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
