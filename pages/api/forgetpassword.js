import user from "@/models/user";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async(req,res)=>{
    const userData = await user.findOne({email:req.body.userEmail})

    if(userData.token!= ""){


        const pass = CryptoJS.AES.encrypt(req.body.password, process.env.JWT_SECRET).toString()

       const udata = await user.findByIdAndUpdate({_id:userData._id }, {$set:{password:pass , token:""}},{new:true})


       
       res.status(200).send({success:true,userData:udata , msg:"Password changed successfully"})

    }else{

        res.status(200).send({success:true , msg:"Reset password link has expired"})
    }

    res.status(400).send({success:true , msg:"BAD REQUEST"})


}
export default connectDb(handler)