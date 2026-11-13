// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import order from "@/models/order"
import connectDb from "@/middleware/mongoose"
import jwt from "jsonwebtoken"
const handler = async(req,res)=>{

    const token = req.body.token
    const data = jwt.verify(token , process.env.JWT_KEY)
    let orders = await order.find({ email: data.email , status:"completed" })
    res.status(200).json({ orders : orders })
  }

export default connectDb(handler)