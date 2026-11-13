// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import messages from "@/models/messages";
import connectDb from "@/middleware/mongoose"

const handler = async(req,res)=>{
    if(req.method=='POST'){

        const {name , email ,message } = req.body
        let m = new messages({name , email , message})
        await m.save()
        
    res.status(200).json({ success :"success" })
    }
    else{
        res.status(400).json({ error :"This is not allowed" })
    }

}

export default connectDb(handler)