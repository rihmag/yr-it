const Course = require("./coursemodel")



const CreateCourse = async (req, res) => {
    try {
            const instructor = req.user_id
            const image = req.file.path
            const { title, description,category,price} = req.body
            if(!title || !description || !instructor  || !category || !price || !image){
                    return res.status(400).json({message:"fill all the details"})

            }
            const newCourse = await Course.create({
                title,
                description,
                category,
                price,
                instructor,
                image,
            })
            return res.status(201).json(newCourse)
        }
     
    catch (error) {
        console.log(error)
    }
}
module.exports = CreateCourse;