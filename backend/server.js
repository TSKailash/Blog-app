const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const User=require('./models/UserModel')
require('dotenv').config();
const userRoutes=require('./routes/UserRoutes')

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
        .then(()=>{console.log("MongoDB Connected")})
        .catch((err)=>{console.log(err)})

app.get("/",(req,res)=>{
    res.send("HEllo");
})



app.use('/', userRoutes)

app.listen(3000, ()=>{
    console.log("App running")
})