import { Link , useNavigate} from "react-router-dom";
import React, { use } from "react";

 // Assuming you want to use localStorage for authentication
 // Assuming you have a logout handler


export default function Navbar({SetisAuthenticated}) {
  const navigate = useNavigate();
  return (
    <nav className="bg-white mb-6">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">Yr-learning</Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/courses" className="text-gray-700 hover:text-blue-600">Courses</Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-600  ">Login</Link>
          <Link to="/signup" className="text-gray-700 hover:text-blue-600">Sign Up</Link>
          <Link to="/ide" className="text-gray-700 hover:text-blue-600">IDE</Link>
          <button onClick={()=>{
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            SetisAuthenticated(false);
            navigate('/login');
          }
          }> logout</button>
        </div>
      </div>
    </nav>
  );
} 