import user from "@/models/user";
import connectDb from "@/middleware/mongoose";
const CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, msg: "Method not allowed" })
    }

    const { userEmail, password, cpassword, resetToken } = req.body
    if (!userEmail || !password || password !== cpassword || !resetToken) {
        return res.status(400).json({ success: false, msg: "Password values do not match" })
    }

    if (password.length < 4) {
        return res.status(400).json({ success: false, msg: "Password is too short" })
    }

    const userData = await user.findOne({ email: userEmail })

    if (!userData) {
        return res.status(400).json({ success: false, msg: "Reset password link has expired" })
    }

    if (userData.token && userData.token === resetToken) {
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ success: false, msg: "Server configuration error" })
        }

        const pass = CryptoJS.AES.encrypt(password, process.env.JWT_SECRET).toString()
        await user.findByIdAndUpdate(
            { _id: userData._id },
            { $set: { password: pass, token: "" } },
            { new: true }
        )

        return res.status(200).json({ success: true, msg: "Password changed successfully" })
    } else {
        return res.status(400).json({ success: false, msg: "Reset password link has expired or is invalid" })
    }

}
export default connectDb(handler)