// const express=require('express')


// const CLIENT_ID=process.env.CLIENT_ID;
// const CLIENT_SECRET=process.env.CLIENT_SECRET;

// const app = express.Router()

// app.use(express.urlencoded({extended:true}))
// app.use(express.json())

// app.get('/',(req,res)=>{
//  res.sendFile(__dirname+"/index.html")
// })

// app.get('/github/callback',async (req,res)=>{
//     const {code} = req.query;

//     // const access_token = await fetch(
//     //  "https://github.com/login/oauth/access_token",
//     // {
//     //     method:"POST",
//     //     headers:{
//     //         accept:"application/json",
//     //         "content-type":"application/json"
//     //     },
//     //     body:JSON.stringify({
//     //         client_id:CLIENT_ID,
//     //         client_secret:CLIENT_SECRET,
//     //         code,
//     //     }),
//     //   }
//     // ).then((res)=>res.json()).catch(console.error)


//     // const userDetails=await fetch("https://api.github.com/user",
//     // {
//     //     headers:{
//     //         Authorization:`Bearer ${access_token}`
//     //     }
//     // }).then((res)=>res.json()).catch((e)=>{console.log(e);})

//     // console.log(access_token);

//     //so we can get data from api and then add to mongoDb

//     return res.send("Sign in with github success")
//    })


// module.exports=app