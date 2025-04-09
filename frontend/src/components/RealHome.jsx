import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const RealHome = () => {
    const [user, setUser] = useState('');
    const [posts, setPosts] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem("user");
        if (userInfo) {
            setUser(userInfo);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            
            setLoading(true);
            try {
                // Fetch user details
                const userResponse = await fetch(`http://localhost:3000/api/getUser/${user}`);
                if (userResponse) {
                    const userData = await userResponse.json();
                    setUserDetails(userData.data);
                }
                
                // Fetch user posts
                const postsResponse = await fetch(`http://localhost:3000/api/getprofile/${user}`);
                const postsData = await postsResponse.json();
                
                if (!postsResponse.ok) {
                    console.error("Failed to fetch posts");
                } else if (postsData.message === "NO UPLOADS") {
                    setPosts([]);
                } else {
                    setPosts(postsData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleDelete = async (postId) => {
        try {
            const result = await fetch(`http://localhost:3000/api/deletepost/${postId}`, {
                method: "DELETE"
            });
    
            const deleted = await result.json();
    
            if (result.ok) {
                setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
            } else {
                console.error("Failed to delete:", deleted.message);
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-8">
                {/* User Profile Section */}
                {userDetails && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-3xl mx-auto">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="flex-shrink-0">
                                {userDetails.image ? (
                                    <img 
                                        src={`http://localhost:3000/${userDetails.image}`} 
                                        alt="Profile" 
                                        className="w-32 h-32 rounded-full object-cover border-4 border-violet-200"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-violet-200 flex items-center justify-center">
                                        <span className="text-3xl font-bold text-violet-500">
                                            {userDetails.username?.charAt(0).toUpperCase() || "U"}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h1 className="text-2xl font-bold text-gray-800 mb-2">{userDetails.username}</h1>
                                <p className="text-gray-600 mb-2">{userDetails.email}</p>
                                {userDetails.bio && (
                                    <p className="text-gray-700 mb-3">{userDetails.bio}</p>
                                )}
                                {userDetails.DOB && (
                                    <p className="text-sm text-gray-500">
                                        <span className="font-medium">DOB:</span> {userDetails.DOB}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Posts Section */}
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Posts</h2>
                    
                    {posts.length === 0 ? (
                        <div className="bg-white rounded-lg shadow p-8 text-center">
                            <p className="text-gray-600">You haven't uploaded any posts yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post) => (
                                <div
                                    key={post._id}
                                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg"
                                >
                                    <img
                                        src={`http://localhost:3000/${post.image}`}
                                        alt={post.caption}
                                        className="w-full h-48 sm:h-56 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.caption}</h3>
                                        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                                            <span>{post.time}</span>
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                                </svg>
                                                <span>{post.upvote}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default RealHome;