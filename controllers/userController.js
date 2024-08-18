const User=require("../models/user");
const sendEmail=require("../service/sendEmail");
const asyncHandler= require("express-async-handler");



//@desc sending otp to user through mail
//@route POST /api/otp
//@access public
const otpToUser=asyncHandler(async(req,res)=>{
    const {username,email,phoneNo} = req.body;
    if(!username || !email || !phoneNo)
    {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // const userAvailable=await User.findOne({email});  //checking user is already registered or not // pass email as object 
    // if(userAvailable)  // as email is unique so that by it
    // {
    //     res.status(400);
    //     throw new Error("User already registered");
    // }
    // now user is not already registered so storing 


    //sendEmail(); wrong
    await sendEmail({ email ,res });  
})



module.exports={otpToUser};