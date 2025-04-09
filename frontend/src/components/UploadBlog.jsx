import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from './Navbar';

const UploadBlog = () => {
  const { username } = useParams();
  const [formdata, setFormdata] = useState({
    image: '',
    caption: '',
    username: username,
    email: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormdata({
        ...formdata,
        [e.target.name]: file
      });
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formdata.image || !formdata.caption.trim()) {
      alert("Please select an image and enter a caption.");
      setIsSubmitting(false);
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

      if (response.ok) {
        navigate("/bloglist");
      } else {
        console.error("Upload failed");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error uploading post:", error);
      setIsSubmitting(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormdata({
      ...formdata,
      image: ''
    });
    const fileInput = document.getElementById('imageUpload');
    if (fileInput) fileInput.value = '';
  };

  // Color theme
  const colors = {
    primary: "#FF5722",    // Vibrant orange
    secondary: "#9C27B0",  // Purple
    accent1: "#2196F3",    // Blue
    accent2: "#4CAF50",    // Green
    accent3: "#FFC107",    // Amber
    dark: "#263238",       // Dark blue-grey
    light: "#FAFAFA"       // Almost white
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 py-8 px-4">
        <div className="max-w-xl mx-auto">
          {/* Colorful header cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-lg p-4 shadow-lg transform rotate-1">
              <h3 className="text-white font-bold">Create</h3>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg p-4 shadow-lg -mt-2">
              <h3 className="text-white font-bold">Share</h3>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg p-4 shadow-lg transform -rotate-1">
              <h3 className="text-white font-bold">Inspire</h3>
            </div>
          </div>

          {/* Main form card */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border-t-4" style={{ borderColor: colors.primary }}>
            <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-5">
              <h2 className="text-2xl font-bold text-white">Create Your Blog Post</h2>
              <p className="text-white opacity-90 text-sm">Express yourself with colors and imagery</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-5">
                {/* Image Upload Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image
                  </label>
                  
                  {imagePreview ? (
                    <div className="flex items-start space-x-4">
                      {/* Smaller image preview */}
                      <div className="relative rounded-lg overflow-hidden border-2 border-pink-200 w-32 h-32 flex-shrink-0">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none"
                          style={{ width: "18px", height: "18px" }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Image info */}
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {formdata.image.name || "Image selected"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Click the X to remove and upload a different image
                        </p>
                        
                        {/* Image tags */}
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Selected
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Ready to upload
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300"
                      style={{ borderColor: colors.secondary, background: "#F3E5F5" }}
                    >
                      <input
                        id="imageUpload"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleInputImage}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="space-y-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8" style={{ color: colors.secondary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="font-medium text-sm" style={{ color: colors.secondary }}>
                          Click to upload an image
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Caption Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Caption
                  </label>
                  <div 
                    className="relative rounded-lg overflow-hidden"
                    style={{ boxShadow: "0 0 0 2px rgba(255, 87, 34, 0.2)" }}
                  >
                    <textarea
                      name="caption"
                      placeholder="What's on your mind?"
                      value={formdata.caption}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="block w-full border-0 p-3 focus:ring-2 focus:ring-offset-2 resize-none"
                      style={{ 
                        focusRing: colors.primary,
                        background: "#FFF9C4"
                      }}
                    />
                    <div className="absolute bottom-1 right-2">
                      <span className="text-xs text-gray-500">
                        {formdata.caption.length} characters
                      </span>
                    </div>
                  </div>
                </div>

                {/* Author Badge */}
                <div 
                  className="p-3 rounded-lg flex items-center space-x-2" 
                  style={{ background: "#E3F2FD" }}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ background: colors.accent1 }}
                  >
                    {username ? username.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Posting as</p>
                    <p className="font-medium text-sm" style={{ color: colors.accent1 }}>
                      {username}
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-lg font-bold text-white shadow-lg transform transition hover:-translate-y-0.5 disabled:opacity-50"
                  style={{ 
                    background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publishing...
                    </span>
                  ) : (
                    'Publish Blog Post'
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* Colorful bottom cards */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg p-4 shadow-lg transform -rotate-1">
              <p className="text-white text-sm font-medium">Let your creativity shine!</p>
            </div>
            <div className="bg-gradient-to-br from-lime-500 to-green-600 rounded-lg p-4 shadow-lg transform rotate-1">
              <p className="text-white text-sm font-medium">Share your story today</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadBlog;