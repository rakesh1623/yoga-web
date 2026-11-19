const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type:String , required :true},
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true},
    token :{type:String , default:""},
    otp :{type:String , default:"000000"},


  }, {timestamps:true});
export default mongoose.models.user || mongoose.model("user", userSchema);