// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import order from "@/models/order"
import connectDb from "@/middleware/mongoose"
const handler = async(req,res)=>{

    if (req.method === "POST") {
        const { orderId, status } = req.body;

        console.log(orderId, status)
    
        if (!orderId || !status) {
          return res.status(400).json({ success: false, message: "Missing orderId or status" });
        }
    
        try {
           const o = await order.findOneAndUpdate(
            { orderId },
            { status }, 
            { new: true }
          );
    
          if (o) {
            
            return res.status(200).json({ success: true, order });
          } else {
            
            return res.status(404).json({ success: false, message: "Order not found" });
          }
        } catch (error) {
          
          return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
      } else {
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
      }
  }

export default connectDb(handler)
  