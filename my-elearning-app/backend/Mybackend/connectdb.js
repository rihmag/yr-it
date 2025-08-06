const mongoose = require('mongoose');
const dotenv=require("dotenv")
dotenv.config()
 // Replace with your Mongo
const connectdb= async()=>{
  await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connection successful');
  })
  .catch(err => {       
    console.error('Database connection error:', err);
  });process.env.DB_URI
}
module.exports =connectdb // Export mongoose for use in other files    