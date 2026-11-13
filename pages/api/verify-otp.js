import user from "@/models/user";
import connectDb from "@/middleware/mongoose";
const cookie = require('cookie');
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, email, otp, password } = req.body;
    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    const Eotp = cookies.emailOtp || null;

    if (Eotp != otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    try {
      let u = new user({
        name,
        email,
        password: CryptoJS.AES.encrypt(password, process.env.JWT_SECRET).toString(),
      });

      await u.save();
      var token = jwt.sign({ email:email , name:name}, process.env.JWT_KEY);

      res.status(200).json({ success: true, msg: "User created successfully", token});
    } catch (error) {
      res.status(500).json({ success: false, msg: "Error creating user", error: error.message });
    }

  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
