const mongoose=require('mongoose');


const userSchema=new mongoose.Schema(
    {
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,

    },
    role:{
       type:String,
       enum:['student','admin'],
       default:'student',
    },
    department:{
        type:String,
    },
    year:{
        type:Number,
    },
     isActive: {
      type: Boolean,
      default: true,
    },
},
    {
        timestamps:true
    }
);

userSchema.index({ email: 1 });
module.exports=mongoose.model('User',userSchema);