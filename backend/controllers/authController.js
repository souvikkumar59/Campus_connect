const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/User');  
const dotenv=require('dotenv');
exports.LoginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email||!password){
            return res.status(400).json({
                message:'Please provide email and password',
                success:false,
            })
        }
        const user=await User.findOne({email});

        if(!user){
            return res.status(401).json({
                message:'Invalid email or password',
                success:false,
            })
        }

        if(!user.isActive){
            return res.status(403).json({
                message:'Your account is deactivated. Please contact admin.',
                success:false,  
        });
        }


        const passwordMatch=await bcrypt.compare(password,user.password);

        if(!passwordMatch){
            return res.status(401).json({
                message:'Invalid email or password',
                success:false,
            })
        }

        const token=jwt.sign({
            id:user._id,
            role:user.role,
        },process.env.JWT_SECRET,{
            expiresIn:'5d', 
        });

        return res.status(200).json({
            message:'Login successful',
            success:true,
            token,
            data:{
                id:user._id,
                name:user.name,
                email:user.email,
                department:user.department,
                year:user.year,
            },
        });
    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message:'Server error',
            success:false,
        });
        
    }
};

