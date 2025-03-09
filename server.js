const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const User=rquire('./models/User')
const bcrypt=require("bcryptjs")

const app=express()
const PORT=3000
//home page api
app.get('/',(req,res)=>{
    res.send("<h1>Welcome to the MERN stack week 2 session</h1>")
})
//registration page api
app.post('/register',async(req,res)=>{
    const{Username,email,password}=req.body
    try{
        const hashedpassword= await bcrypt.hash(password,10)
        const user=new User({Username,email,password:hashedpassword})
        await User.save()
        res.json({message:"User Registred.."})
        console.log("User Registration Completed...")    
    }

    catch(err)
    {
        console.log(err)
    }
})
//Login page api

app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) 
            {
             return res.status(400).json({ message: "Invalid Credentials" });
            }
          res.json({ message: "Login Successful", username: user.username });
    }
    catch(err)
    {
        console.log(err)
    }
})


mongoose.connect(process.env.MONGO_URL).then(
 ()=>console.log("DB connected sucessfully..")   
).catch(
    (err)=>console.log(err)
)

app.listen(PORT,(err)=>{
    if(err)
    {
        console.log(err)
    }
    console.log("Server is running on port:"+PORT)
})