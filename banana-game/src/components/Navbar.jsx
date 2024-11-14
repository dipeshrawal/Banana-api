import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    // Check if the user is logged in by checking the presence of a token
    const token = localStorage.getItem("token");

    // Handle logout by removing token from localStorage and redirecting to home/login page
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username"); // Remove username as well
        navigate("/"); // Redirect to home or login page after logging out
    };

    return (
        <div className="flex justify-between item-center bg-slate-500 max-w-screen p-1">
            
                <Link to="/home" className="text-2xl font-bold justify-center"> 🍌 </Link>
                <div className='justify-center items-center'>  
                    {/* <span className="">Hello, {localStorage.getItem("username")}</span> Display username */}
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                    Logout
                </button>
                </div>
                


        </div>
    );
};

export default Navbar;
