const express=require('express')
const router=express.Router()
const User=require('../models/UserModel')

router.post('/signup', async(req, res)=>{
    try{
        const {username, email, password}=req.body;
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).send({message:"User already exists"})
        }
        const user=new User({username, email, password})
        await user.save()
        return res.status(200).send({message:"success"})
    }
    catch(err){
        return res.status(400).send({message:err.message})
    }
})

router.post('/login', async(req, res)=>{
    try{
        const {email, password}=req.body;
        const existingUser=await User.findOne({email})
        if(existingUser){
            // console.log(password, existingUser.password)
            if(password===existingUser.password){
                
                return res.status(200).send({message:"success", username:existingUser.username})
            }
            else{
                return res.status(401).send({message:"Incorrect password"})
            }
        }
        else{
            return res.status(404).send({message:"User not_found"})
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message:err.message})
    }
})
router.get("/api/user/:username", async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    res.json(user);
  });

module.exports=router