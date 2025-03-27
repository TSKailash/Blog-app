const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const User=require('./models/UserModel')


const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/blog")
        .then(()=>{console.log("MongoDB Connected")})
        .catch((err)=>{console.log(err)})

app.get("/",(req,res)=>{
    res.send("HEllo");
})

app.post("/addUser", async(req, res)=>{
    try{
        const {username, email, password}=req.body
        const exist=await User.findOne({email})
        if(exist){
             return res.status(400).json({message: "Already created"})
        } 
        const user=new User({username, email, password})
        await user.save()
        return res.status(200).json({message: "User created"})
    }
    catch(err){
        console.log(err);
        return res.status(404).json({error: err.message})
    }

})
app.listen(3000, ()=>{
    console.log("App running")
})