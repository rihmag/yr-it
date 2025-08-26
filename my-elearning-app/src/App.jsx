import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import AllCourses from "./pages/AllCourses";
import Course from "./pages/Course";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Refreshhandler from "./handlers/refreshhandler";
import CodeEditor from "../IDE/codefiles/compiler";
import CreatorPanel from "./panels/creatorpanel";
import AddCourse from "./panels/AddCourse";
import ManageCourses from "./panels/ManageCourses";
import EnrolledStudents from "./panels/EnrolledStudents";
import Earnings from "./panels/Earnings";
import EditCourse from "./panels/EditCourse";
import EditBanner from "./panels/EditBanner";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";



const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  useEffect(() => {
    // Show initial loader for first-time page load
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000); // Show loader for 2 seconds on initial load

    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) {
    return <Loader />;
  }
  
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Refreshhandler SetIsAuthenticated={setIsAuthenticated} />
        <div className="pt-20">
          <Navbar SetisAuthenticated={setIsAuthenticated} />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course/:courseId" element={<Course />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<AllCourses/>}/>
                          
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/login" element={<Login SetIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route 
              path="/ide" 
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <CodeEditor />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/panel/:id/*" 
              element={
               
                  <CreatorPanel />
                
              }
            >
              <Route index element={<Navigate to="manage-courses" replace />} />
              <Route path="add-course" element={<AddCourse />} />
              <Route path="manage-courses" element={<ManageCourses />} />
              <Route path="edit-banner" element={<EditBanner />} />
              <Route path="edit-course/:courseId" element={<EditCourse />} />
              <Route path="enrolled-students" element={<EnrolledStudents />} />
              <Route path="earnings" element={<Earnings />} />
            </Route>
          </Routes>
          
          <Footer />
        </div>
        <Toaster />
      </Router>
    </div>
  );
}

export default App;