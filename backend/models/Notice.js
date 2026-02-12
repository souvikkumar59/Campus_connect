const mongoose = require('mongoose');


const noticeSchema=new mongoose.Schema(
    {
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    priority:{
        type:String,
        enum:['Low','Medium','High'],
        default:'Low',
    },
    expiryDate:{
        type:Date,
    },
     expiresAt: {
      type: Date,
    },
},{
    timestamps:true,
}
);

noticeSchema.index({createdAt:-1});
module.exports=mongoose.model('Notice',noticeSchema);

