import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';

const RealHome = () => {
    const [user,setuser] = useState('');
    useEffect(()=>{
        const userinfo = localStorage.getItem("user");
        if(userinfo){
            setuser(userinfo);
        }
    },[])

    const [posts,setPosts] = useState([])
    const [userdetials,setuserdetails] = useState([])
    useEffect(()=>{
        const fetchdetails = async ()=>{
          const resdetails = await fetch(`http://localhost:3000/api/getmyinfo/${user}`)
          const pfpdetails = await resdetails.json();

        }
        const fetchinfo =async()=>{
            const res = await fetch(`http://localhost:3000/api/getprofile/${user}`)
            const pfpdata = await res.json();
            setPosts(pfpdata);
        }
        if(user){
            fetchinfo();
            fetchdetails()
        }
    },[user])
    console.log(user);

    const handleDelete =async (postId)=>{
        try{
            const result = await fetch(`http://localhost:3000/api/deletepost/${postId}`,{
                method:"DELETE"
            })
    
            const deleted = await result.json();
    
            if(result.ok){
                setPosts((prevpost)=>prevpost.filter((post)=>post._id!=postId))
            }else {
                console.error("Failed to delete:", deleted.message);
            }
        }catch(error){
            console.log(error)
        }
        
    }    

  return (
    <>
        <div><Navbar/></div>
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200"
          >
            <img
              src={`http://localhost:3000/${post.image}`}
              alt="Uploaded"
              className="w-full h-auto object-contain max-h-96 bg-gray-50"
            />
            <div className="flex flex-col gap-2 p-4">
              <h2 className="text-xl font-semibold text-gray-800">{post.caption}</h2>
              <p className="text-sm text-gray-600">Posted by: <span className="font-medium">{post.userName}</span></p>
              <p className="text-xs text-gray-400">Date: {post.time}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-semibold text-green-600">Upvotes: {post.upvote}</span>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="px-4 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default RealHome