const mongoose = require('mongoose');

const productScheme = new mongoose.Schema({
    title: {type:String , required :true},
    slug:{type:String , required:true,unique:true},
    desc:{type:String , required:true},
    note:{type:String },
    img:{type:String , required:true},
    morningtime:{type:String , required:true},
    eveningtime:{type:String , required:true},
    price:{type:Number , required:true},

  }, {timestamps:true});
  mongoose.models ={}
  export default mongoose.model("product",productScheme);