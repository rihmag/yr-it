const Course = require("./coursemodel")
// You would create a helper for your cloud storage service
// const {uploadFileToCloudinary}  = require("./cloudinary"); // No longer needed

const CreateCourse = async (req, res) => {
    try {
        const instructor = req.user_id;
        const { title, description, category, price } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Course image is required." });
        }

        if (!title || !description || !instructor || !category || !price) {
            return res.status(400).json({ message: "Please fill all the details." });
        }

        // This is a placeholder for your image upload logic.
        // You would replace this with a call to your cloud storage service.
        // For example: const imageUrl = await uploadToCloudinary(req.file.buffer);
        // For now, we'll just acknowledge that a file was received.
        // IMPORTANT: The line below is NOT a real implementation.
        // uploadToCloudinary(req.file.path)
        let thumbnailbuffer
        thumbnailbuffer =   req.file ? req.file.buffer.toString('base64') :  null;
        

        const newCourse = await Course.create({
            title,
            description,
            category,
            price,
            instructor,
            thumbnail:thumbnailbuffer,
             // Save the public URL from your storage provider
        });
        return res.status(201).json(newCourse);}
    catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).json({ message: "Failed to create course.", error: error.message });
    }
}
const ManageCourses = async (req, res) => {
      try {
            const id = req.user_id
        
            const courses = await Course.find({instructor:id });
             
            res.status(200).json(courses);
            console.log(courses)
      }
      catch(error)
      {
        console.log(error,error.message="could not fetch your courses")
    }
      }
const Allcourses = async (req,res)=>{
    try{
         const fetch_all_courses = await Course.find()
         res.status(200).json(fetch_all_courses)
         console.log(fetch_all_courses)
    }
    catch(error)
    {
        console.log(error,error.message="could not fetch all courses")

    }
}
const editcourse = async (req,res)=>{
    
}
module.exports = {
    CreateCourse,
    ManageCourses,
    Allcourses,
  
};