const Razorpay = require("razorpay");
import connectDb from "@/middleware/mongoose";
import order from "@/models/order";

const handler = async(req,res)=>{

  if (req.method === "POST") {
    const {cart , subTotal , oid , email , name , phone , address} = req.body;

    let o = new order({

      email : email,
      orderId : oid,
      name : name,
      address : address,
      amount : subTotal,
      products : cart 

    })
    await o.save()

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const amount = Number(subTotal) ;
    const options = {
      amount:(amount*100).toString(),
      currency : "INR",
      
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
        o : o._id
      });
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.status(400).json({msg:"Razorpay error"})
  }
  
}
export default connectDb(handler)

