import React, { useState } from 'react';
import Navbar from './Navbar';
import Blog_main from '../assets/Images/blog-main.jpeg'

const Home = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  
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
                <img src="/api/placeholder/40/40" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="/api/placeholder/40/40" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="/api/placeholder/40/40" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
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
      
      {/* Modal for Login/Signup */}
      {(isLoginModalOpen || isSignupModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => {
                setIsLoginModalOpen(false);
                setIsSignupModalOpen(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <div className="flex border-b border-gray-200">
              <button 
                className={`flex-1 py-4 text-center font-medium ${activeTab === 'login' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('login')}
              >
                Log In
              </button>
              <button 
                className={`flex-1 py-4 text-center font-medium ${activeTab === 'signup' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('signup')}
              >
                Sign Up
              </button>
            </div>
            
            <div className="py-6">
              {activeTab === 'login' ? (
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                    <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input type="checkbox" id="remember" className="rounded text-indigo-600 focus:ring-indigo-500" />
                      <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
                    </div>
                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">Forgot password?</a>
                  </div>
                  <button className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300">Log In</button>
                </form>
              ) : (
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                    <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600" />
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="terms" className="rounded text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-800">Terms</a> and <a href="#" className="text-indigo-600 hover:text-indigo-800">Privacy Policy</a></label>
                  </div>
                  <button className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300">Sign Up</button>
                </form>
              )}
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <button className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <svg className="w-5 h-5 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </button>
                  <button className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <svg className="w-5 h-5 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.09-.193-7.715-2.157-10.141-5.126-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14v-.617c.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                    </svg>
                  </button>
                  <button className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <svg className="w-5 h-5 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814c-1.798-1.676-4.198-2.707-6.735-2.707-5.523 0-10 4.477-10 10s4.477 10 10 10c8.396 0 10.249-7.85 9.426-11.748l-9.426.087z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;