import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from './Navbar';

const UploadBlog = () => {
  const { username } = useParams();
  const [email, setEmail] = useState();
  
  useEffect(() => {
    const getEmail = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/getemail/${username}`);
        const data = await res.json();
        setEmail(data.email);
      } catch (err) {
        console.log(err);
      }
    };
    getEmail();
  }, [username]);
  
  const [formdata, setFormdata] = useState({
    image: '',
    caption: '',
    username: username,
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
    uploadData.append("email", email);
    uploadData.append("upvote", 0);

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 py-12 px-4">
        <div className="max-w-xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">Create Your Blog Post</h1>
            <p className="text-pink-600">Express yourself with words and imagery</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-blue-600">
            <div className="bg-blue-700 p-5">
              <h2 className="text-2xl font-bold text-white">New Post</h2>
              <p className="text-white opacity-90 text-sm">Share your thoughts with the world</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image
                  </label>
                  
                  {imagePreview ? (
                    <div className="flex items-start space-x-4">
                      <div className="relative rounded-lg overflow-hidden border-2 border-blue-200 w-32 h-32 flex-shrink-0">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-1 right-1 bg-pink-500 text-white p-1 rounded-full hover:bg-pink-600 focus:outline-none"
                          style={{ width: "18px", height: "18px" }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {formdata.image.name || "Image selected"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Click the X to remove and upload a different image
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Selected
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-pink-100 text-pink-800">
                            Ready to upload
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 bg-blue-50 border-blue-300 hover:bg-blue-100"
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="font-medium text-sm text-blue-600">
                          Click to upload an image
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Caption
                  </label>
                  <div className="relative rounded-lg overflow-hidden border-2 border-pink-200">
                    <textarea
                      name="caption"
                      placeholder="What's on your mind?"
                      value={formdata.caption}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="block w-full border-0 p-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-none"
                    />
                    <div className="absolute bottom-1 right-2">
                      <span className="text-xs text-gray-500">
                        {formdata.caption.length} characters
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg flex items-center space-x-2 bg-blue-50">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold bg-blue-600">
                    {username ? username.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Posting as</p>
                    <p className="font-medium text-sm text-blue-700">
                      {username}
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-lg font-bold text-white shadow-lg transform transition hover:-translate-y-0.5 disabled:opacity-50 bg-pink-500"
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
          
          <div className="mt-6 text-center">
            <p className="text-sm text-blue-700">
              Your creativity matters. Share your unique perspective with the world.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadBlog;