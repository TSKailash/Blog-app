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
                navigate(`/${result.username}`);
            }
            else if(response.status===401){
                seterrmessage("Incorrect password. Try Again")
            }
            else if(response.status===404){
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
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />
            <div className="flex justify-center items-center flex-1">
                <form onSubmit={handlesubmit} className='bg-white p-8 shadow-lg rounded-lg w-96'>
                    <h2 className='text-2xl font-bold text-center text-gray-700 mb-4'>Login</h2>
                    {errmessage && <p className='text-red-600 text-center mb-4'>{errmessage}</p>}
                    <div className='flex flex-col gap-4'>
                        <label className='text-gray-600 font-medium'>Enter your Email:</label>
                        <input 
                            type='email' 
                            required 
                            name='email' 
                            value={formdata.email}
                            onChange={handlechange} 
                            className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400'
                        />
                        <label className='text-gray-600 font-medium'>Enter your Password:</label>
                        <input 
                            type='password' 
                            required 
                            name='password' 
                            value={formdata.password}
                            onChange={handlechange} 
                            className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400'
                        />
                        <button 
                            type='submit' 
                            className='bg-violet-500 text-white py-2 rounded-md hover:bg-violet-600 transition duration-300'
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;