import user from "@/models/user"
import connectDb from "@/middleware/mongoose"
import jwt from "jsonwebtoken"
const handler = async(req,res)=>{

    const token = req.body.token
    const data = jwt.verify(token , process.env.JWT_KEY)
    let u = await user.find({ email: data.email })
    if(u){

      res.status(200).json({ user : u })
    }else{
      res.status(400).json({ error :"error"  })

    }
  }

  export default connectDb(handler)
  