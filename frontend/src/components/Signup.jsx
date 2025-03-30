import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
      username:"",
      email:"",
      password:""
  });
  
  const handlesubmit = async(e) => {
      e.preventDefault();
      try {
          const responce = await fetch("http://localhost:3000/signup", {
              method:'POST',
              headers: {
                  "Content-Type": "application/json",
                },
              body:JSON.stringify(formData)
          })
          const result = await responce.json()
          if(result.message==='success') {
              navigate('/');
          } else {
              console.log(result.message);
          }
      }
      catch(err) {
          console.log(err);
      }
  }

  const handleChange = (e) => {
      setformData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className='flex justify-center items-center flex-1'>
        <form onSubmit={handlesubmit} className='bg-white p-8 shadow-lg rounded-lg w-96'>
          <h2 className='text-2xl font-bold text-center text-gray-700 mb-4'>Sign Up</h2>
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
  )
}

export default Signup
