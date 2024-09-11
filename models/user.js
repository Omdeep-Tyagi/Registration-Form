const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username: { type: String },
    email: { type: String, unique: true },//In Joi, there isn't a built-in validation rule to directly check for uniqueness
    phoneNo: { type: String },
    studentNo: { type: Number},
    branch: { type: String },
    section: { type: String },
    domain: { type: String },
    gender: { type: String },
    scholarType: { type: String},
    ip: { type: String }
});

const User=mongoose.model("User",userSchema);

module.exports=User;

