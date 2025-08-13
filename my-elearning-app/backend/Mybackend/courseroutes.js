const express = require("express");
const {CreateCourse,ManageCourses,Allcourses, getCourse,getLessons,addLessons} = require("./coursecontroller");
const isAuthenticated = require("./authmiddleware");


const upload = require('./storage');// Use memory storage to handle file as a buffer



const CourseRouter = express.Router();

CourseRouter.post("/create",isAuthenticated,upload.single('thumbnail'),CreateCourse);
CourseRouter.get("/managecourses",isAuthenticated,ManageCourses)
CourseRouter.get("/allcourses",Allcourses)
CourseRouter.get("/getbycourseid/:id",getCourse)
CourseRouter.get("/lessons/:id",getLessons)
CourseRouter.put("/updatelessons/:id",addLessons)
module.exports = CourseRouter;