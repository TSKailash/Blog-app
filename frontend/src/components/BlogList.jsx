import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activePostId, setActivePostId] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [username,setusername]=useState('');
  const navigate = useNavigate();

  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setIsLoading(false);
      });
  
    if (email) {
      fetch(`http://localhost:3000/api/getusername/${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.data && data.data.username) {
            setusername(data.data.username);
          } else {
            console.warn("Username not found in response");
          }
        })
        .catch((err) => {
          console.error("Error fetching username:", err);
        });
    }
  }, [email]);

  if (isLoading) {
    return (
      <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 min-h-screen">
        <div className="flex justify-center">
          <div className="w-full max-w-xl animate-pulse flex flex-col space-y-4 p-4">
            <div className="h-4 bg-blue-200 rounded w-3/4"></div>
            <div className="h-64 bg-blue-200 rounded-lg"></div>
            <div className="h-64 bg-blue-200 rounded-lg"></div>
            <div className="h-64 bg-blue-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }



  const enhancedPosts = posts.map(post => ({
    ...post,
    author: post.userName || "User Name",
    username: post.email || post.author?.toLowerCase().replace(/\s/g, '') || "username",
    verified: '',
    likes: post.upvote ?? 200,
    comments: post.comments || [],
    commentCount: Array.isArray(post.comments) ? post.comments.length : 100,
    shares: 1000,
    views: 2000,
    time: post.time ? post.time : "2h"
  }));

  const handleUpVote = async (postId) => {
    console.log(`${postId}`);
    const res = await fetch(`http://localhost:3000/api/updateupvote/${postId}/${email}`, {
      method: "POST",
    });
    const data = await res.json();
    if (data.message === 'success') {
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId
            ? { ...post, upvote: (post.upvote || 0) + 1 }
            : post
        )
      );
      console.log("Success upvote");
    }
    else {
      console.log("Failed to upvote");
    }
  };

  const postComment = async (postId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/updatecomment/${postId}/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newComment })
      });

      const data = await res.json();

      if (data.message === 'Comment added') {
        // Update the posts state to include the new comment
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post._id === postId
              ? {
                ...post,
                comments: Array.isArray(post.comments)
                  ? [...post.comments, { user: email, text: newComment, time: 'Just now' }]
                  : [{ user: email, text: newComment, time: 'Just now' }]
              }
              : post
          )
        );

        // Clear the comment input
        setNewComment("");
        console.log("Comment posted successfully");
      } else {
        console.log("Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 min-h-screen">
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Full Size"
              className="max-w-[90vw] max-h-[90vh] rounded"
            />
            <button
              className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded-full shadow hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
      
      {activePostId && (
        <div
        className="fixed right-0 top-1/2 transform -translate-y-1/2 mr-10 bg-white p-4 shadow-lg z-50"
        onClick={() => setActivePostId(null)}
      > 
          <div className="bg-white rounded-lg shadow-xl p-6 w-[400px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-blue-600">Comments</h3>
              <button 
                onClick={() => setActivePostId(null)}
                className="p-2 hover:bg-blue-100 rounded-full transition-all duration-200"
              >
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            {/* Comment input */}
            <div className="mb-4">
              <textarea 
                value={newComment} 
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:border-blue-400 transition-all duration-200"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
              <button 
                onClick={() => {
                  if (newComment.trim()) {
                    postComment(activePostId);
                  }
                }}
                className="mt-2 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg font-bold transition-all duration-200 shadow-md"
              >
                Post Comment
              </button>
            </div>
            
            {/* Comment list */}
            <div className="space-y-3">
              {(() => {
                const activePost = posts.find(post => post._id === activePostId);
                const comments = activePost?.comments;
                
                if (Array.isArray(comments) && comments.length > 0) {
                  return comments.map((comment, index) => (
                    <div key={index} className="border border-blue-100 rounded-lg p-3 bg-blue-50">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center mr-2">
                          <span className="font-bold text-white text-xs">
                            {comment.user ? comment.user.charAt(0) : 'U'}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-sm">{comment.user || 'User'}</p>
                          <p className="text-xs text-blue-500">
                            {comment.time || 'Just now'}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm whitespace-pre-line">{comment.text}</p>
                    </div>
                  ));
                } else {
                  return (
                    <div className="text-center py-6">
                      <svg className="w-12 h-12 text-blue-200 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      )}
      
      <div className="flex">
        {/* Left Sidebar */}
        <div className="hidden md:flex md:w-1/4 lg:w-1/5 xl:w-1/4 flex-col p-4 sticky top-0 h-screen">
          <div className="flex flex-col space-y-6">
            <div className="p-2">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-500 fill-current">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            
            {["Home", "Explore", "Notifications", "Messages", "Lists", "Bookmarks", "Communities", "Profile", "More"].map((item, index) => (
              <button key={index} className="flex items-center space-x-4 p-2 hover:bg-blue-100 rounded-lg transition-all duration-200">
                <div className="w-6 h-6">
                  <svg className="w-full h-full text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={
                      item === "Home" ? "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" :
                      item === "Explore" ? "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" :
                      item === "Notifications" ? "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" :
                      item === "Messages" ? "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" :
                      item === "Profile" ? "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" :
                      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    }></path>
                  </svg>
                </div>
                <span className="text-lg font-normal">{item}</span>
              </button>
            ))}
            
            <button onClick={() => {navigate('/uploadblog')}} className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-lg text-center transition-all duration-200 shadow-lg">
              Create Post
            </button>
          </div>
          
          <div className="mt-auto mb-4 flex items-center p-3 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-200" onClick={()=>{
            navigate('/myprofile')
          }}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 mr-3 flex items-center justify-center">
              <span className="font-bold text-white">UN</span>
            </div>
            <div>
              <p className="font-bold">{`${username}`}</p>
              <p className="text-blue-500">{`@${email}`}</p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 border-x border-blue-200 min-h-screen max-w-xl mx-auto backdrop-blur-sm bg-white bg-opacity-70">
          <div className="sticky top-0 z-10 bg-white bg-opacity-90 backdrop-blur-md p-4 border-b border-blue-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-blue-600">Your Feed</h2>
              <div className="flex">
                <button className="p-2 hover:bg-blue-100 rounded-full transition-all duration-200">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex mt-4">
              <div className="flex-1 text-center py-3 border-b-2 border-blue-500 font-bold text-blue-600">For You</div>
              <div className="flex-1 text-center py-3 text-blue-400 hover:bg-blue-100 transition-all duration-200">Following</div>
            </div>
          </div>
          
          {/* Create Post */}
          <div className="p-4 border-b border-blue-200 bg-blue-50 bg-opacity-50">
            <div className="flex">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 mr-3 flex items-center justify-center">
                <span className="font-bold text-white">UN</span>
              </div>
              <div className="flex-1">
                <div className="rounded-lg bg-white border border-blue-200 w-full py-3 px-4 text-lg text-gray-600 placeholder-gray-400 hover:bg-blue-50 transition-all duration-200 mb-2">
                  What's on your mind?
                </div>
                <div className="flex justify-between">
                  <div className="flex space-x-3 text-blue-500">
                    <button className="hover:bg-blue-100 p-2 rounded-full transition-all duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </button>
                    <button className="hover:bg-blue-100 p-2 rounded-full transition-all duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                      </svg>
                    </button>
                    <button className="hover:bg-blue-100 p-2 rounded-full transition-all duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </button>
                  </div>
                  <button className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-1 rounded-lg font-bold transition-all duration-200 shadow-md">
                    Post 
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Posts */}
          <div className="flex flex-col">
            {enhancedPosts.map((post, index) => (
              <div key={post._id || index} className="p-4 border-b border-blue-200 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center"
                      onClick={() => {navigate(`/profiles/${post.author}`)}}
                    >
                      <span className="font-bold text-white">{post.author.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <p className="font-bold hover:underline">{post.author}</p>
                      {post.verified && (
                        <svg className="w-5 h-5 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                        </svg>
                      )}
                      <p className="text-blue-500 ml-1">@{post.username} · {post.time}</p>
                    </div>
                    
                    <p className="mt-2 text-base whitespace-pre-line">{post.caption}</p>
                    
                    {post.image && (
                      <div className="mt-3 rounded-lg overflow-hidden border border-blue-200 shadow-lg transform transition-all duration-300 hover:scale-[1.01]">
                        {post.image.endsWith(".mp4") ? (
                          <video
                            controls
                            className="w-full h-auto object-cover"
                            onClick={() => setSelectedImage(`${post.image}`)}
                          >
                            <source src={`${post.image}`} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            src={`${post.image}`}
                            alt={post.caption}
                            onClick={() => setSelectedImage(`${post.image}`)}
                            className="w-full h-auto object-cover"
                          />
                        )}
                      </div>
                    )}
                    
                    <div className="mt-4 flex justify-between max-w-md">
                      <button 
                        className="flex items-center space-x-1 text-blue-500 hover:text-indigo-500 group transition-all duration-200" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePostId(post._id);
                        }}
                      >
                        <div className="p-2 rounded-full group-hover:bg-blue-100 transition-all duration-200">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                          </svg>
                        </div>
                        <span>{Array.isArray(post.comments) ? post.comments.length : post.commentCount}</span>
                      </button>
                      
                      <button className="flex items-center space-x-1 text-blue-500 hover:text-purple-500 group transition-all duration-200">
                        <div className="p-2 rounded-full group-hover:bg-blue-100 transition-all duration-200">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                          </svg>
                        </div>
                        <span>{post.shares}</span>
                      </button>
                      
                      <button 
                        className="flex items-center space-x-1 text-blue-500 hover:text-pink-500 group transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpVote(post._id);
                        }}
                      >
                        <div className="p-2 rounded-full group-hover:bg-blue-100 transition-all duration-200">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                          </svg>
                        </div>
                        <span>{post.likes}</span>
                      </button>
                      
                      <button className="flex items-center space-x-1 text-blue-500 hover:text-indigo-500 group transition-all duration-200">
                        <div className="p-2 rounded-full group-hover:bg-blue-100 transition-all duration-200">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="hidden lg:block lg:w-1/3 xl:w-1/4 px-4 py-4 sticky top-0 h-screen">
          <div className="bg-white bg-opacity-70 rounded-lg mb-4 shadow-sm">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input type="text" className="bg-transparent text-gray-800 w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none border border-blue-200 focus:border-blue-400 transition-all duration-200" placeholder="Search" />
            </div>
          </div>
          
            
          
          
          <div className="text-xs text-blue-500 mt-4 flex flex-wrap">
            <span className="mr-2 mb-2 hover:underline cursor-pointer">Terms of Service</span>
            <span className="mr-2 mb-2 hover:underline cursor-pointer">Privacy Policy</span>
            <span className="mr-2 mb-2 hover:underline cursor-pointer">Cookie Policy</span>
            <span className="mr-2 mb-2 hover:underline cursor-pointer">Accessibility</span>
            <span className="mr-2 mb-2 hover:underline cursor-pointer">Ads info</span>
            <span className="mr-2 mb-2 hover:underline cursor-pointer">More</span>
            <span className="mr-2 mb-2">© 2025 YourBlog Inc.</span>
          </div>
        </div>
      </div>
      
      <div className="md:hidden fixed bottom-6 right-6">
        <button className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BlogList;