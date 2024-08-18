const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:[true, "Please add the Name"],
    },
    email:{
        type:String,
        required:[true, "Please add the Email address"],
    },
    phoneNo:{
        type:Number,
        required:[true, "Please add the Phone Number"],
    }
});

const User=mongoose.model("User",userSchema);

module.exports=User;