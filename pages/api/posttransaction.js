// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import order from "@/models/order"
import connectDb from "@/middleware/mongoose"

const handler = async (req, res)=> {

    console.log(req.body)

    // let o =await order.findOne({orderId : req.body.razorpay_order_id})
    // order.findByIdAndUpdate(o._id ,{status : "Paid"})
    res.status(200).json({ body: req.body })
  }

  export default connectDb(handler)
  