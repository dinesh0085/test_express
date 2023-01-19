const mongoose=require("mongoose");

const categorySchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  }
},{timestamps:true})

const categoryModel=mongoose.model("Post",categorySchema)

module.exports=categoryModel
