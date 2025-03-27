import React from 'react'

const Navbar = () => {
  return (
    <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-3xl font-bold text-indigo-600">Blog<span className="text-pink-500">Verse</span></span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">Explore</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">Features</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">About</a>
            <button 
              className="px-4 py-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300"
            >
              Log in
            </button>
            <button 
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 shadow-lg hover:shadow-indigo-300/50 transition-all duration-300"
            >
              Sign up
            </button>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-700 hover:text-indigo-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
  )
}

export default Navbar