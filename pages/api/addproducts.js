// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import product from "@/models/product"
import connectDb from "@/middleware/mongoose"
const handler = async(req,res)=>{
    if(req.method=='POST'){
        for(let i=0 ; i<req.body.length ; i++){
        let p = new product({
            title: req.body[i].title,
            slug: req.body[i].slug,
            desc: req.body[i].desc,
            img: req.body[i].img,
            morningtime:req.body[i].morningtime,
            eveningtime:req.body[i].eveningtime,
            price: req.body[i].price
        })

        await p.save()
    }
    res.status(200).json({ success :"success" })
    }
    else{
        res.status(400).json({ error :"This is not allowed" })
    }

}

export default connectDb(handler);