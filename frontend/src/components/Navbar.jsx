import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);




  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser)
    }
  }, []);

  const handleLogin = () => {
    navigate('/login')
  }

  const handleSignup = () => {
    navigate('/signup')
  }

  const handleHome=()=>{
    if(user){
      navigate(`/${user}`)
    }
    else{
      navigate('/')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate('/');
  }

  return (
    <nav className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl font-bold text-indigo-600">Blog<span className="text-pink-500">Verse</span></span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" onClick={handleHome}  className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">Home</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">Features</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">About</a>

          {user ? (
            <>
              <button 
                className="px-4 py-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300 cursor-pointer"
                onClick={()=>{navigate('/myprofile')}}
              >
                Profile
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-red-600 font-medium hover:text-red-800 transition-colors duration-300 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                className="px-4 py-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300 cursor-pointer" 
                onClick={handleLogin}
              >
                Log in
              </button>
              <button 
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 shadow-lg hover:shadow-indigo-300/50 transition-all duration-300 cursor-pointer"
                onClick={handleSignup}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
