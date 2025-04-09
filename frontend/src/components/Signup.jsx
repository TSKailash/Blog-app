import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    DOB: ""
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    // Create FormData object to handle file uploads
    const uploadData = new FormData();
    uploadData.append("image", image);
    uploadData.append("bio", formData.bio);
    uploadData.append("username", formData.username);
    uploadData.append("email", formData.email);
    uploadData.append("password", formData.password);
    uploadData.append("DOB", formData.DOB);

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: 'POST',
        // Don't set Content-Type header when sending FormData
        // The browser will automatically set the correct Content-Type with boundary
        body: uploadData
      });
      
      const result = await response.json();
      
      if (result.message === 'success') {
        navigate('/');
      } else {
        setError(result.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please check your connection and try again.");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className='flex justify-center items-center flex-1'>
        <form onSubmit={handleSubmit} className='bg-white p-8 shadow-lg rounded-lg w-96'>
          <h2 className='text-2xl font-bold text-center text-gray-700 mb-4'>Sign Up</h2>
          {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
          <div className='flex flex-col gap-4'>
            <label className='text-gray-600 font-medium'>Enter Username:</label>
            <input 
              type='text' 
              placeholder='Type here' 
              required 
              name='username' 
              value={formData.username}  
              onChange={handleChange} 
              className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400'
            />
            
            <label className='text-gray-600 font-medium'>Enter Your Email:</label>
            <input 
              type='email' 
              placeholder='Type here' 
              required 
              name='email' 
              value={formData.email}  
              onChange={handleChange} 
              className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400'
            />
            
            <label className='text-gray-600 font-medium'>Enter Your Password:</label>
            <input 
              type='password' 
              placeholder='Type here' 
              required 
              name='password' 
              value={formData.password} 
              onChange={handleChange} 
              className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400'
            />

            <label className='text-gray-600 font-medium'>Your Profile Pic</label>
            <input 
              type='file' 
              accept='image/*'
              required 
              name='image' 
              onChange={handleImageChange} 
              className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400'
            />
            
            {imagePreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Preview:</p>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-24 h-24 object-cover rounded-md" 
                />
              </div>
            )}

            <label className='text-gray-600 font-medium'>Enter your bio</label>
            <textarea 
              name="bio"
              placeholder='About yourself'
              required 
              value={formData.bio}
              onChange={handleChange} 
              className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400'
            />

            <label className='text-gray-600 font-medium'>Enter your DOB</label>
            <input 
              type='date' 
              required 
              name='DOB' 
              value={formData.DOB} 
              onChange={handleChange} 
              className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400'
            />

            <button 
              type='submit' 
              className='bg-violet-500 text-white py-2 rounded-md hover:bg-violet-600 transition duration-300'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;