const express=require('express')
const router=express.Router()
const User=require('../models/UserModel')
const Post= require('../models/PostModel')

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
                
                return res.status(200).send({message:"success", username:existingUser.username,email:existingUser.email})
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

router.get("/api/getemail/:username",async(req,res)=>{
    try{
        const user = await User.findOne({username:req.params.username});
        if(user){
            res.json(user);
        }else{
            res.status(400).json({error:"NOt FOUND"});
        }
    }catch(err){
        res.status(500).json({error:err});
        console.log(err);
    }
})

router.post("/api/getupvote/:postId",async(req,res)=>{
    try{
        const user = await Post.findOneAndUpdate({_id:req.params.postId},
            {$inc:{upvote:1}}
        );
        res.status(200).json({message:"success"});
    }
    catch(error){
        console.log(error);
        res.status(400).json({message:"Not updated"});
    }
})

module.exports=router