import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/getUser/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data.data); // assumes backend sends { message, data: userObj }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [username]);

  if (!result) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <img
          src={`/${result.profilePic}`}
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-indigo-500"
        />
        <h2 className="text-2xl font-bold mt-4 text-gray-800">{result.username}</h2>
        <p className="text-gray-600">{result.email}</p>
        {result.bio && (
          <p className="mt-4 text-gray-700 italic">"{result.bio}"</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
