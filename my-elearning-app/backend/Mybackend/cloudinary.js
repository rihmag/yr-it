const cloudinary = require('cloudinary').v2;

const multer  = require("multer")
const fs = require('fs');
const dotenv=require("dotenv")
dotenv.config();

const uploadcloudinary= () => {
    // Configuration
    cloudinary.config({ 
        cloud_name: 'dwax1ydqg', 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });

    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'videos',
            public_id:(req,file)=>file.fieldname+"-"+Date.now()
        }
    })

    const upload = multer({ storage: storage })
    return upload
};

module.exports=uploadcloudinary;