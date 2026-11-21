import connectDb from "@/middleware/mongoose"
import user from "@/models/user"
import nodemailer from "nodemailer"
import Randomstring from "randomstring"

function getAppUrl(req) {
    if (process.env.NEXT_PUBLIC_APP_URL) {
        return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "")
    }

    const forwardedHost = req.headers["x-forwarded-host"]
    const host = forwardedHost || req.headers.host
    const forwardedProto = req.headers["x-forwarded-proto"]
    const protocol = forwardedProto || (host && host.includes("localhost") ? "http" : "https")

    return host ? `${protocol}://${host}` : "http://localhost:3000"
}

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, msg: "Method not allowed" })
    }

    const email = req.body?.userEmail
    if (!email) {
        return res.status(400).json({ success: false, msg: "Email is required" })
    }

    try {
        const foundUser = await user.findOne({ email })
        if (!foundUser) {
            return res.status(404).json({ success: false, msg: "No account found for this email" })
        }

        const mailUser = process.env.user || process.env.EMAIL_USER
        const mailPass = process.env.password || process.env.EMAIL_PASS
        if (!mailUser || !mailPass) {
            return res.status(500).json({ success: false, msg: "Mail server is not configured" })
        }

        const resetToken = Randomstring.generate()
        await user.updateOne({ _id: foundUser._id }, { $set: { token: resetToken } })

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: mailUser, pass: mailPass }
        })

        const resetUrl = `${getAppUrl(req)}/forgetpassword?token=${encodeURIComponent(resetToken)}`
        await transporter.sendMail({
            from: mailUser,
            to: foundUser.email,
            subject: "Reset your Aum Yoga password",
            html: `<p>Hi ${foundUser.name},</p><p>Use this link to reset your password:</p><p><a href="${resetUrl}">Reset password</a></p><p>If you did not request this, you can ignore this email.</p>`
        })

        return res.status(200).json({
            success: true,
            msg: "Email sent successfully. Please check your inbox.",
            check: true
        })
    } catch (error) {
        console.error("Reset password mail failed:", error)
        return res.status(500).json({ success: false, msg: error.message || "Unable to send reset email" })
    }
}

export default connectDb(handler)