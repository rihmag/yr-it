import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Course from "./pages/Course";
import About from "./pages/About";
import AllCourses from "./pages/AllCourses";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Refreshhandler from "./handlers/refreshhandler";
import CodeEditor from "../IDE/codefiles/compiler";

function App() {
  const [isAuthenticated, SetIsAuthenticated] = useState(false);
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (

    <Router>
      <Refreshhandler  SetIsAuthenticated={SetIsAuthenticated} />
      
      <Navbar SetisAuthenticated={SetIsAuthenticated} />
      
      
      {/* Add a global state for authentication */}
      <Routes>
        
        <Route path="/"  element={<Home/>}/>
        <Route path="/course/:courseId" element={<Course />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<AllCourses />} />
        <Route path="/dashboard" element={ <PrivateRoute children={<Dashboard/>}/>}/>
        <Route path="/login" element={<Login SetIsAuthenticated={SetIsAuthenticated} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ide" element={<CodeEditor />} />
        {/* Add more routes here */}
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}

export default App;
