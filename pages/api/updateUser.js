import jwt from "jsonwebtoken";
import user from "@/models/user";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { token, name, email } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const userIdEmail = decoded.email;

    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    const updatedUser = await user.findOneAndUpdate(
        { email: userIdEmail }, 
        { name, email }, 
        { new: true } 
      );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
