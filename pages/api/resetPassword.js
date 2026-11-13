import connectDb from "@/middleware/mongoose"
import user from "@/models/user"
import nodemailer from 'nodemailer'
import Randomstring from "randomstring"

const handler = async(req,res)=>{
    if(req.method =='POST'){
        const sendResetPasswordMail = async (name ,email , randomString)=>{
                try {
                    const transporter = nodemailer.createTransport({
                        service:'gmail',
                        auth:{
                            user:process.env.user,
                            pass:process.env.password
                        }
                    })

                    const mailOptions = {
                        from:process.env.user,
                        to:email,
                        subject:'For reset password',
                        html: '<p> Hiii ' + name + ' Please click the link to reset your password <a href="https://aum-yog.onrender.com/forgetpassword?token=' + randomString + '"> RESET YOUR PASSWORD</a></p>'
                    }

                    transporter.sendMail(mailOptions , function(error , info){
                        if(error){
                            console.log(error)
                        }else{
                            console.log("Mail has been sent : ", info.response)
                        }
                    })
                    
                } catch (error) {
                    res.status(400).send({success:false , msg:error.message})
                }
        }

        const e = req.body.userEmail
        
            
            const randomstring = Randomstring.generate();
            await user.updateOne({email:e} , {$set:{token:randomstring}})
            let u = await user.find({ email: e })
            sendResetPasswordMail(u[0].name , u[0].email , randomstring ).then(
                res.status(200).json({ success:true, msg:"Email sent successfully ! Please check your inbox" , check:true ,token : randomstring })     
            )
        }

 
}
export default connectDb(handler)