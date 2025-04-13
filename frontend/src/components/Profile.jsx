import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const Profile = () => {
  const { username } = useParams();
  const [userDetails, setResult] = useState(null);
  const [posts, setPosts]=useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch(`http://localhost:3000/api/getUser/${username}`);
        const userData = await userRes.json();
        setResult(userData.data);
        const postsResponse = await fetch(`http://localhost:3000/api/getprofile/${username}`);
        const postsData = await postsResponse.json();
  
        if (!postsResponse.ok) {
          console.error("Failed to fetch posts");
        } else if (postsData.message === "NO UPLOADS") {
          setPosts([]);
        } else {
          setPosts(postsData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
  
    fetchData(); // Call the async function
  }, [username]);
  

  if (!userDetails) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  return (
    <><div><Navbar/>
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-3xl mx-auto">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="flex-shrink-0">
                                {userDetails.image ? (
                                    <img 
                                    src={`${userDetails.image}`}
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
    </div>
    <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">{username}'s Posts</h2>
                    
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
                                        src={`${post.image}`}
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
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
    </>
    
  );
};

export default Profile;
