const multer = require('multer')
const path = require('path')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/images')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = `${Date.now()}+${file.originalname}`
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
   
// })
const storage = multer.memoryStorage()


const upload = multer({storage})
module.exports = upload