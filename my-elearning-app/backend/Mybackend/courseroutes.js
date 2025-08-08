
const express = require("express");
const CreateCourse = require("./coursecontroller.js");
const isAuthenticated = require("./authmiddleware");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // or configure storage properly

const CourseRouter = express.Router();

CourseRouter.post("/create",isAuthenticated,upload.single('image'),CreateCourse);

module.exports = CourseRouter;