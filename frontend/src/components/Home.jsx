import React from 'react';
import Navbar from './Navbar';
import Blog_main from '../assets/Images/blog-main.jpeg'
import { useNavigate, useParams } from 'react-router-dom';
import person1 from '../assets/Images/person1.jpeg'
import person2 from '../assets/Images/person2.jpeg'
import person3 from '../assets/Images/person3.jpeg'

const Home = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  localStorage.setItem("username", username);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
            <span className='text-pink-500'>Share Your Story With</span><br></br> <span className='text-indigo-700'>The World</span>
          </h1>
          <p className="text-gray-700 text-xl mb-12 max-w-2xl mx-auto">
            Join our vibrant community of writers, thinkers, and creators. Start your blogging journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <button 
              onClick={() => {
                navigate(`/uploadblog/${username}`)
              }}
              className="px-10 py-4 text-lg bg-indigo-600 text-white font-bold rounded-full shadow-xl hover:shadow-indigo-300/50 hover:bg-indigo-700 transform hover:-translate-y-1 transition-all duration-300"
            >
              Get Started
            </button>
            <button 
              onClick={() => {
                navigate('/bloglist');
              }}
              className="px-10 py-4 text-lg bg-white text-indigo-600 font-bold rounded-full border-2 border-indigo-600 shadow-lg hover:bg-indigo-50 transform hover:-translate-y-1 transition-all duration-300"
            >
              View Blogs & Explore
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <div className="flex -space-x-3">
              <img src={person1} alt="User" className="w-12 h-12 rounded-full border-2 border-white" />
              <img src={person2} alt="User" className="w-12 h-12 rounded-full border-2 border-white" />
              <img src={person3} alt="User" className="w-12 h-12 rounded-full border-2 border-white" />
            </div>
            <p className="text-gray-700 text-lg">Join <span className="font-bold text-indigo-600">10,000+</span> writers</p>
          </div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="relative z-10 bg-white p-6 rounded-3xl shadow-2xl overflow-hidden">
            <img src={Blog_main} alt="Blog Illustration" className="rounded-2xl w-full object-cover" />
            
            <div className="absolute top-4 right-4 w-16 h-16 bg-indigo-400 rounded-full filter blur-lg opacity-20"></div>
            <div className="absolute bottom-4 left-4 w-20 h-20 bg-pink-400 rounded-full filter blur-lg opacity-20"></div>
          </div>
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-400 rounded-full filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-400 rounded-full filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-400 rounded-full filter blur-xl opacity-20 animate-pulse"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 bg-white/50 backdrop-blur-sm rounded-3xl mx-8 my-8 shadow-lg">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-indigo-800">Why Creators Love Us</h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">Our platform is designed to help you express yourself creatively while building a loyal audience.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 border border-indigo-50">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-center">Easy Content Creation</h3>
            <p className="text-gray-600 text-center">Our intuitive editor makes it simple to create beautiful, engaging blog posts.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 border border-pink-50">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-center">Growing Community</h3>
            <p className="text-gray-600 text-center">Connect with like-minded writers and passionate readers who love your content.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 border border-cyan-50">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-center">Insightful Analytics</h3>
            <p className="text-gray-600 text-center">Track your growth with detailed statistics about your readers and content performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;