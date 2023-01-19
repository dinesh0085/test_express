require("dotenv").config()
const express=require("express")
const userModel=require("./user.model")
const postModel=require("../Post/post.model")
const jwt=require("jsonwebtoken")
// require("./user.router.google.oauth")
// const passport=require("passport")


const app=express.Router();

app.post("/register",async(req,res)=>{
const {username,email,password} = req.body;

try{
const newUser=new userModel({username,email,password})
const user=await newUser.save()
return res.status(201).send({message:"Registration Successfull",user})
}catch(e){
return res.status(401).send(e.message)
}
})

// app.get("/google",passport.authenticate("google",{scope:["profile","email"]}))

// app.get("/google/oauth",(req,res)=>{
//     return res.send("Signup successfull with google")
// })



app.post("/login",async(req,res)=>{
    const {username,password} = req.body;
  
    
    try{
       const user=await userModel.findOne({username,password})
       if(user){

        const token=jwt.sign({id:user._id,username:user.username},process.env.PRIMARY_TOKEN,{
            expiresIn:"1 hour"
        })

        const refreshToken=jwt.sign({id:user._id,username:user.username},process.env.REFRESH_TOKEN,{
            expiresIn:"7 days"
        })
        console.log(token);
        return res.send({user,token,refreshToken})
       
      }else{
        return res.send("User Not Found")
      }

    }catch(e){
    return res.send(e.message)
    }
    })


    app.post("/refresh",async(req,res)=>{
        const refreshToken=req.headers["authorization"]

        if(!refreshToken){
            return res.status(401).send("Unauthorize")
        }

        try{
        const varification=jwt.verify(refreshToken,process.env.REFRESH_TOKEN)

        if(varification){
            const newToken=jwt.sign({id:varification.id,username:varification.username},process.env.PRIMARY_TOKEN,{
                expiresIn:"1 hour"
            })  
            return res.send({varification,newToken})
        }
        }catch(e){
         return res.send(e.message)
        }
    })

app.put("/update/:id",async (req,res)=>{
    const id=req.params.id
    const userId=req.body.id
    
    if(userId===id){

     

       try{
        const updateUser=await userModel.findByIdAndUpdate(id,{
            $set:req.body,
        },{new:true})
        return res.send(updateUser)
       }catch(e){
        return res.send(e.message)
       }

    }else{
        return res.send("You can change your details only")
    }
    
})    

app.delete("/delete/:id",async (req,res)=>{
    const id=req.params.id
    const userId=req.body.id
    
    if(userId===id){
     try{
       const user=await userModel.findById(id)
        try{
            await postModel.deleteMany({username:user.username})
            await userModel.findByIdAndDelete(id)
            return res.send("User has been deleted")
           }catch(e){
            return res.send(e.message)
           }

     }catch(e){
        return res.send("User not found")
     }
      

    }else{
        return res.send("You can delete your account only")
    }
    
}) 

app.get("/:id",async (req,res)=>{
    const id=req.params.id;
    try{
     const user=await userModel.findById(id,{password:0});
     
     return res.send({message:"user found",user})
    }catch(e){
        return res.send("User Not Found")
    }
})


module.exports=app