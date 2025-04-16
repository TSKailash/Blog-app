const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: String,
  caption: String,
  userName: String,
  upvote: Number,
  email: String,
  time: String,
  liked: [String],
  comments: [
    {
      user: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model("Post", postSchema);
