  const mongoose=require("mongoose")

  const postSchema = new mongoose.Schema({
      image: String,
      caption: String,
      userName: String,
      upvote: Number,
      email:String,
      time:String,
      liked:[String]
    });
    
  module.exports = mongoose.model("Post", postSchema);