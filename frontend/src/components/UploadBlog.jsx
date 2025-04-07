import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UploadBlog = () => {
  // const [caption, setCaption] = useState("");
  // const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const {username}=useParams()
  console.log(username)
  const [formdata,setformdata] = useState({
    image:'',
    caption:'',
    username:username 
  })

  const handleInputChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };


  const handleInputImage=(e)=>{
    setformdata({
      ...formdata,[e.target.name]:e.target.files[0]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formdata.image || !formdata.caption.trim()) {
      alert("Please select an image and enter a caption.");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("image", formdata.image);
    uploadData.append("caption", formdata.caption);
    uploadData.append("userName", formdata.username);


    try {
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: uploadData,
      });

      console.log(formdata)

      if (response.ok) {
        navigate("/bloglist"); // Redirect after upload
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };


  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload a Blog Image</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="file" 
          name="image"
          accept="image/*" 
          onChange={handleInputImage} 
          required
          className="block w-full border p-2 rounded"
        />
        <input 
          type="text" 
          name="caption"
          placeholder="Enter Caption" 
          value={formdata.caption}
          onChange={handleInputChange} 
          required
          className="block w-full border p-2 rounded"
        />
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadBlog;
