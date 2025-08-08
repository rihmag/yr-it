const user = require("./usermodel");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try {
         const authHeader = req.headers["authorization"]
         const token = authHeader && authHeader.split(" ")[1]

         console.log(token)
         if(!token){
            return res.status(400).json({message:"user does not have a token"})
         }
         let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
         if(!verifyToken)
         {
            return res.status(400).json({message:"user does not have a valid token"})
         }
         req.user_id=verifyToken.id
         next()
        } 
    catch(error)
    {
        console.log(error,"isAuthError")
    }
}
  module.exports = isAuthenticated;