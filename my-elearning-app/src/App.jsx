import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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




function App() {
  return (

    <div>
                
   
                
    <div className="pt-20">
       
       </div>
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
        <Route path="/ide" element={<PrivateRoute children={<CodeEditor />}/>} />
        <Route path="/panel/:id" element={<CreatorPanel/>}>
          <Route index element={<Navigate to="manage-courses" replace />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="manage-courses" element={<ManageCourses />} />
          <Route path="edit-course/:courseId" element={<EditCourse />} />
          <Route path="enrolled-students" element={<EnrolledStudents />} />
          <Route path="earnings" element={<Earnings />} />
        </Route>
        {/* Add more routes here */}
      </Routes>
      <Footer />
      <Toaster />

    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<AllCourses />} />
            <Route path="/course/:id" element={<Course />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '14px',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>

    </Router>
   
    </div>
  );
}

export default App;
