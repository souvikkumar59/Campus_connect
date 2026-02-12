const mongoose = require('mongoose');

const complainSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true,
        },
        raisedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        status:{
            type:String,
            enum:['Open','In Progress','Resolved'],
            default:'Open',
        },
        adminComment: {
      type: String,
    },
        resolvedAt: {
        type: Date,
    },
    },{
    timestamps:true,
    }
)
complainSchema.index({status:1});
module.exports=mongoose.model('Complain',complainSchema);