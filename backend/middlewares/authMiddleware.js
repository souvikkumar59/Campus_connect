const jwt=require('jsonwebtoken');
const User=require('../models/User');


const authMiddleware=async(req,res,next)=>{
    try{

    const authHeader=req.Headers.authorization;
    if(!authHeader||!authHeader.startswith('Bearer')){

        return res.status(401).json({message:'Unauthorized & token not provided',
            success:false
        });
    }

    const token=authHeader.split(' ')[1];

    const decoded=jwt.verify(token,process.env.JWT_SECRET);

    //find user from db
    const user=await User.findById(decoded.id).select('-password');
    if(!user){
        return res.status(404).json({message:'User not found',
            success:false
        });
}
req.user=user;
next();
}catch(error){
    console.error('Error in authMiddleware:',error);
    res.status(500).json({message:'Internal Server Error'});
}
}

module.exports=authMiddleware;