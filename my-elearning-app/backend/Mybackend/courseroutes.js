const express = require("express");
const {CreateCourse,ManageCourses,Allcourses, UpdateCourse,GetCourseandLessondetails} = require("./coursecontroller");
const isAuthenticated = require("./authmiddleware");


const upload = require('./storage');// Use memory storage to handle file as a buffer
const {uploadcloudinary}  = require("./cloudinary")


const CourseRouter = express.Router();

CourseRouter.post("/create",isAuthenticated,upload.single('thumbnail'),CreateCourse);
CourseRouter.get("/managecourses",isAuthenticated,ManageCourses)
CourseRouter.get("/allcourses",Allcourses)
module.exports = CourseRouter;