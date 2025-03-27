const mongoose=require("mongoose")
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "default-profile.png", 
    },
    bio: {
      type: String,
      maxlength: 200, 
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("User", userSchema);

