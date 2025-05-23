const express=require('express')
const router=express.Router()
const User=require('../models/UserModel')
const Post=require('../models/PostModel')
const multer = require('multer')
const { storage } = require("../utils/cloudinary");
const {cloudinary} = require('cloudinary')

// const profileStorage = multer.diskStorage({
//     destination: "./uploads/profiles/",
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     },
// })
const uploadProfile = multer({ storage })



router.post('/signup', uploadProfile.single('image'), async(req, res) => {
    try {
        const { username, email, password, bio, DOB  } = req.body
        const existingUser = await User.findOne({ email })
        
        if (existingUser) {
            return res.status(400).send({ message: "User already exists" })
        }
        
        const user = new User({
            username, 
            email, 
            password,
            bio,
            DOB,
            image: req.file.path  
        })
        
        
        await user.save()
        return res.status(200).send({ message: "success" })
    }
    catch(err) {
        return res.status(400).send({ message: err.message })
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

router.post("/api/updateupvote/:postID/:email", async (req, res)=>{
    try{
        const email = req.params.email;
        const post = await Post.findOne({_id:req.params.postID})
        if(!post.liked.includes(email)){
            post.upvote+=1;
            post.liked.push(email);
            await post.save();
           res. status(200).send({message:"success"})
        }else{
            res. status(200).send({message:"Already liked"})
        }

       
    }catch(err){
        console.log(err)
        res.status(400).send({message:"fail"})
    }
})

router.get("/api/getprofile/:user",async (req,res)=>{
    try{
        const user = req.params.user
        const pfpposts = await Post.find({userName:user})
        if(pfpposts.length===0){
            return res.status(200).json({message:"NO UPLOADS"})
        }else {
            return res.json(pfpposts);
        }
    }
    catch(error){
        return res.status(400).json({message:"SERVER ERROR"})
    }
})

router.delete("/api/deletepost/:postId",async(req,res)=>{
    try{
        const deletedpost = await Post.findByIdAndDelete(req.params.postId)
        if(!deletedpost){
            return res.status(400).json({message:"POST NOT FOUND"})
        }
        else{
            return res.status(200).json({message:"SUCCESS DELETE"})
        }
    }
    catch(error){
        res.status(500).json({message:"error occured"})
    }
})

router.post("/api/updateLikeName/:postID", async (req, res) => {
    try {
      const { userName } = req.body;
  
      const result = await Post.findOneAndUpdate(
        { _id: req.params.postID },
        { $addToSet: { likes: userName } },
        { new: true }
      );
  
      res.status(200).send({ message: "successfully_added", updatedPost: result });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "fail" });
    }
});

router.get("/api/getUser/:username", async (req, res) => {
    try {
        const result = await User.findOne({ username: req.params.username });
        if (result) {
            res.status(200).json({ message: "success", data: result });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.post("/api/updatecomment/:postId/:email",async(req,res)=>{
    try{
        const post = await Post.findOne({_id:req.params.postId})
        const user = await User.findOne({email:req.params.email})
        const username = user.username
        const comment = req.body.text

        const newcomment=
            {
                user:username,
                text:comment
            }

        post.comments.push(newcomment)
        await post.save();

        res.status(200).json({ message: "Comment added"})
    }catch(err){
        res.status(500).json({ message: "Server error", error: err.message });
    }
})

router.get("/api/getusername/:email",async(req,res)=>{
    try{
        const user = await User.findOne({email:req.params.email})

        if(user){
            res.status(200).json({message:'success', data:user})
        }else{
            res.status(400).json({message:'User not found',})
        }
    }catch(err){
        res.status(500).json({message:"Server error"})
    }
})

module.exports=router