const jwt=require('jsonwebtoken');
const User=require('../models/User');
const bcrypt=require('bcryptjs');


const adminMiddleware=async(req,res,next)=>{
    try{
        if(req.user.role!=='admin'){
             return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
        });
    }
    next();
}catch(error){
    console.log('Error in adminMiddleware:',error);
    return re.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
}
}
module.exports=adminMiddleware;