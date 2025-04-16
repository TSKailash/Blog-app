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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-100 flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center flex-1 px-4 py-8">
        <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-md border border-pink-200">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">Blogverse</h1>
            <h2 className="text-xl font-semibold text-gray-700 mt-2">Create Account</h2>
            <p className="text-gray-500">Join our community of writers</p>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700 font-medium block mb-2">Username</label>
              <input 
                type="text" 
                placeholder="Choose a unique username" 
                required 
                name="username" 
                value={formData.username}  
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="text-gray-700 font-medium block mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="your@email.com" 
                required 
                name="email" 
                value={formData.email}  
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="text-gray-700 font-medium block mb-2">Password</label>
              <input 
                type="password" 
                placeholder="Create a strong password" 
                required 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium block mb-2">Profile Picture</label>
              <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                <input 
                  type="file" 
                  accept="image/*"
                  required 
                  name="image" 
                  onChange={handleImageChange} 
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-500 hover:file:bg-indigo-100"
                />
                
                {imagePreview && (
                  <div className="mt-3 flex justify-center">
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-24 w-24 object-cover rounded-full border-2 border-indigo-200" 
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="text-gray-700 font-medium block mb-2">About Yourself</label>
              <textarea 
                name="bio"
                placeholder="Share a little about yourself..."
                required 
                value={formData.bio}
                onChange={handleChange}
                rows="3" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium block mb-2">Date of Birth</label>
              <input 
                type="date" 
                required 
                name="DOB" 
                value={formData.DOB} 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-medium py-3 px-4 rounded-lg hover:from-indigo-600 hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg mt-6"
            >
              Create Account
            </button>
            
            <div className="text-center mt-4">
              <p className="text-gray-600 text-sm">
                Already have an account? <a href="/" className="text-indigo-500 hover:text-pink-500 font-medium">Sign in</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;