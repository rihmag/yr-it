const Course = require("./coursemodel")
// You would create a helper for your cloud storage service
const uploadToCloudinary  = require("./filelelunga");

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
       
        thumbnail = req.file.path;
        

        const newCourse = await Course.create({
            title,
            description,
            category,
            price,
            instructor,
            thumbnail,
             // Save the public URL from your storage provider
        });
        return res.status(201).json(newCourse);}
    catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).json({ message: "Failed to create course.", error: error.message });
    }
}

module.exports = CreateCourse;