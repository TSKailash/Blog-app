const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const User=require('./models/UserModel')
require('dotenv').config();
const userRoutes=require('./routes/UserRoutes')
const multer = require("multer");
const { storage } = require("./utils/cloudinary");
const Post=require("./models/PostModel")
const {cloudinary}=require('./utils/cloudinary')

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
        .then(()=>{console.log("MongoDB Connected")})
        .catch((err)=>{console.log(err)})

app.get("/",(req,res)=>{
    res.send("HEllo");
})

// const storage = multer.diskStorage({
//     destination: "./uploads/",
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname)); 
//     },
//   });
  const upload = multer({ storage });

  // app.use("/uploads", express.static("uploads"));

  app.post("/api/upload", upload.single("image"), async (req, res) => {
    try {
      const now = new Date();
  
      const newPost = new Post({
        image: req.file.path, // Now this is the Cloudinary URL
        caption: req.body.caption,
        userName: req.body.userName,
        email: req.body.email,
        time: now.toLocaleDateString(),
        upvote: req.body.upvote || 0,
      });
  
      await newPost.save();
      res.json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error uploading image" });
    }
  });
  
  app.get('/api/posts', async (req, res)=>{
    const posts=await Post.find();
    res.json(posts)
  })

app.use('/', userRoutes)

app.listen(3000, ()=>{
    console.log("App running")
})