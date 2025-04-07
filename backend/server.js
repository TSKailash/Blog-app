const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const User=require('./models/UserModel')
require('dotenv').config();
const userRoutes=require('./routes/UserRoutes')
const multer = require("multer");
const path = require("path");
const Post=require("./models/PostModel")

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
        .then(()=>{console.log("MongoDB Connected")})
        .catch((err)=>{console.log(err)})

app.get("/",(req,res)=>{
    res.send("HEllo");
})

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    },
  });
  const upload = multer({ storage });

  app.use("/uploads", express.static("uploads"));

  app.post("/api/upload", upload.single("image"), async (req, res) => {
    try {
      const newPost = new Post({
        image: req.file.path, // ✅ Correct way
        caption: req.body.caption,
        userName: req.body.userName
      });
      await newPost.save();
      res.json(newPost);
    } catch (error) {
      console.error(error); // 👈 helpful for debugging
      res.status(500).json({ message: "Error uploading image" });
    }
  });
  
  
  // Fetch Posts
  app.get("/api/posts", async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
  });

// app.post("/addUser", async(req, res)=>{
//     try{
//         const {username, email, password}=req.body
//         const exist=await User.findOne({email})
//         if(exist){
//              return res.status(400).json({message: "Already created"})
//         } 
//         const user=new User({username, email, password})
//         await user.save()
//         return res.status(200).json({message: "User created"})
//     }
//     catch(err){
//         console.log(err);
//         return res.status(404).json({error: err.message})
//     }

// })

app.use('/', userRoutes)

app.listen(3000, ()=>{
    console.log("App running")
})