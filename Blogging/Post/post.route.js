const express=require("express")
const userModel=require("../Users/user.model")
const postModel=require("./post.model")
const jwt=require("jsonwebtoken");




const app=express.Router();



// Create Post
app.post("/create",async(req,res)=>{
    const token=req.headers["authorization"]

    if(token){
      const varification=jwt.decode(token);
      const createPost=new postModel({username:varification.username,...req.body})

    try{
     const savePost=await createPost.save()
     return res.send(savePost)
    }catch(e){
        return res.send(e.message)
    }
    }else{
        return res.send("Please login")
    }
    
})

// update post

app.put("/update/:id",async(req,res)=>{
    const id=req.params.id;
    const token=req.headers["authorization"]

     try{
            const user=jwt.decode(token)
            const post=await postModel.findById(id)
            if(post){
                if(post.username===user.username){
                    const updatedpost=await postModel.findByIdAndUpdate(id,{
                        $set:req.body
                    },{new:true})
                    return res.send(updatedpost)
                }else{
                    return res.send("You are not edit this post")
                }
            }else{
                return res.send("please provide valid id")
            }
            
        }catch(e){
           return res.send(e.message)
        }
    
})


// delete post

app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    const token=req.headers["authorization"]

    const post=await postModel.findById(id)

    const user=jwt.decode(token)


   
        try{
            if(post.username===user.username){
                const deletedPost=await postModel.findByIdAndDelete(id)
                return res.send(deletedPost)
            }else{
                return res.send("You are not delete this post")
            }
        }catch(e){
            return res.send(e.message)
        }
    
})

app.get("/:id",async(req,res)=>{
    const id=req.params.id;

    try{
     const post=await postModel.findById(id);
     if(post){
        return res.send(post)
     }else{
        return res.send("Post not Found")
     }
     

    }catch(e){
     return res.send(e.message)
    }
})


app.get("/",async(req,res)=>{
    const username=req.query.user;
    const catName=req.query.cat;
    console.log(username);
 
   try{
    let posts;
    if(username){
         posts=await postModel.find({username});   
    }else if(catName){
         posts=await postModel.find({cetegories:{
            $in:[catName],
        }});
    }else{
         posts=await postModel.find();   
    }
     
     if(posts){
        return res.send(posts)
     }else{
        return res.send("Post not Found")
     }
     

    }catch(e){
     return res.send(e.message)
    }
})



module.exports=app