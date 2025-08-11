const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const dotenv=require("dotenv")
dotenv.config();
const express = require('express');



const uploadcloudinary= async (localfilepath) => {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dwax1ydqg', 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     try{const uploadResult = await cloudinary.uploader
       .upload(
           localfilepath, {
               public_id: 'shoes',
           }
       )
       console.log(uploadResult);
    }
    catch(error)
    {   
        fs.unlinkSync(localfilepath)
        console.log(error)
        return

    }
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
      
   
};
module.exports=uploadcloudinary;

