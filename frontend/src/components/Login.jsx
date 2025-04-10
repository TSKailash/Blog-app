import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Login = () => {
    const navigate = useNavigate();
    const [formdata, setformdata] = useState({
        email: "",
        password: ""
    });
    const [errmessage, seterrmessage] = useState('');

    const handlechange = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        seterrmessage(""); // Clear previous error messages
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formdata)
            });
            const result = await response.json();
            
            if (response.status === 200) {
                localStorage.setItem("user", result.username)
                localStorage.setItem("userEmail", result.email);
                navigate(`/${result.username}`);
            }
            else if(response.status === 401){
                seterrmessage("Incorrect password. Try Again")
            }
            else if(response.status === 404){
                seterrmessage("User Not Found. Please add user")
            }
            else {
                seterrmessage(result.message || "Login failed. Please try again.");
            }
        } catch (err) {
            seterrmessage("An error occurred. Please check your connection and try again.");
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-100 flex flex-col">
            <Navbar />
            <div className="flex justify-center items-center flex-1 px-4">
                <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-md border border-pink-200">
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">Blogverse</h1>
                        <h2 className="text-xl font-semibold text-gray-700 mt-2">Welcome Back</h2>
                        <p className="text-gray-500">Sign in to continue to your account</p>
                    </div>
                    
                    {errmessage && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md">
                            <p className="text-red-600 text-sm">{errmessage}</p>
                        </div>
                    )}
                    
                    <form onSubmit={handlesubmit} className="space-y-5">
                        <div>
                            <label className="text-gray-700 font-medium block mb-2">Email Address</label>
                            <input 
                                type="email" 
                                required 
                                name="email" 
                                value={formdata.email}
                                onChange={handlechange} 
                                placeholder="Enter Email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
                            />
                        </div>
                        
                        <div>
                            <label className="text-gray-700 font-medium block mb-2">Password</label>
                            <input 
                                type="password" 
                                required 
                                name="password" 
                                value={formdata.password}
                                onChange={handlechange}
                                placeholder="Enter Password" 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-medium py-3 px-4 rounded-lg hover:from-indigo-600 hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg"
                        >
                            Sign In
                        </button>
                        
                        <div className="text-center mt-4">
                            <p className="text-gray-600 text-sm">
                                Don't have an account? <a href="/signup" className="text-indigo-500 hover:text-pink-500 font-medium">Sign up</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;