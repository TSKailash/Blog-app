import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const Profile = () => {
  const { username } = useParams();
  const [userDetails, setResult] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/getUser/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
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
    </div></>
    
  );
};

export default Profile;
