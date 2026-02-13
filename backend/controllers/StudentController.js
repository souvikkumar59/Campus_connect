const User=require('../models/User');
const bcrypt=require('bcryptjs');

exports.registerStudent=async(req,res)=>{
    try{

        const {name,email,password,department,year} =req.body;
        if(!name||!email||!password||!department||!year){
            res.status(400).json({
                message:'Please provide all required fields',
                success:false,
            })

    }

    const existuser=await User.findOne({email});
    if(existuser){
        return res.status(400).json({
            message:'User already exists with this email',
            success:false,
        })
    }

    const hashpassword=await bcrypt.hash(password,10);

    const Student=new User.create({
        name,email,password:hashpassword,
        department,year,role:"student"
    });



    return res.status(201).json({
        message:'Student registered successfully',
        success:true,
        date:{
            id:Student._id,
            name:Student.name,
            email:Student.email,
            department:Student.department,
            year:Student.year,
            role:Student.role,
            isActive:Student.isActive,
        }
    })
}catch(err){
    console.error(err);
    return res.status(500).json({
        message:'Server error',
        success:false,
    });
}
    
};



exports.getstudentProfile=async(req,res)=>{
    try{
        const studentId=req.User.id;
        const student=await User.findById(studentId).select('-password');
        if(!student){
            return res.status(404).json({
                message:'Student not found',
                success:false,
            });
        }


        return res.status(200).json({
            success:true,
            data:student,
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message:'Server error',
            success:false,
        });
    }
}


