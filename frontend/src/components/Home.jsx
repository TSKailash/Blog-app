import React, { useState } from 'react';
import Navbar from './Navbar';
import Blog_main from '../assets/Images/blog-main.jpeg'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import person1 from '../assets/Images/person1.jpeg'
import person2 from '../assets/Images/person2.jpeg'
import person3 from '../assets/Images/person3.jpeg'

const Home = () => {
  const navigate = useNavigate();
  const {username}=useParams()
  console.log(username)
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-indigo-100">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Share Your Story With The <span className="text-indigo-600">World</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Join our vibrant community of writers, thinkers, and creators. Start your blogging journey today and connect with readers across the globe.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <button 
                onClick={()=>{console.log(username)
                  navigate(`/uploadblog/${username}`)}}
                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-indigo-300/50 hover:bg-indigo-700 transform hover:-translate-y-1 transition-all duration-300"
              >
                Get Started
              </button>
              <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full border-2 border-indigo-600 hover:bg-indigo-50 transform hover:-translate-y-1 transition-all duration-300">
                Learn More
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <img src={person1} alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src={person2} alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src={person3} alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
              </div>
              <p className="text-gray-600">Join <span className="font-semibold text-indigo-600">10,000+</span> writers</p>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl">
              <img src={Blog_main} alt="Blog Illustration" className="rounded-lg w-2xl" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-400 rounded-full filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400 rounded-full filter blur-xl opacity-70 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Creators Love Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Our platform is designed to help you express yourself creatively while building a loyal audience.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Easy Content Creation</h3>
            <p className="text-gray-600">Our intuitive editor makes it simple to create beautiful, engaging blog posts.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Growing Community</h3>
            <p className="text-gray-600">Connect with like-minded writers and passionate readers who love your content.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-cyan-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Insightful Analytics</h3>
            <p className="text-gray-600">Track your growth with detailed statistics about your readers and content performance.</p>
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default Home;