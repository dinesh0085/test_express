const express=require('express')
require("dotenv").config()
const connect=require("./confiig/dbConnect")
const userRouter=require("./Users/user.route")
const postRouter=require("./Post/post.route")
// const oauthRouter=require("./Users/user.router.oauth")

const PORT=process.env.PORT 

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hello world")
})
app.use("/user",userRouter)
app.use("/post",postRouter)

app.listen(PORT,async ()=>{
    try{
        await connect()
        }catch(e){
            console.log(e.message)
        }
     console.log(`Listening Server on port ${PORT}`)
    })