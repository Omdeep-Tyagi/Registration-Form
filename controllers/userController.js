const User=require("../models/user");
const sendEmail=require("../service/sendEmail");
const asyncHandler= require("express-async-handler");


//@desc sending otp to user through mail
//@route POST /api/otp
//@access public
const otpToUser=asyncHandler(async(req,res)=>{
    const {username,email,phoneNo,studentNo,branch,section,gender,scholarType} = req.body;
   

    // Get user's IP address from request 
    const userIp =req.headers['x-forwarded-for'] || req.ip;//Handling the IP address in a proxied environment as well

    const userAvailable=await User.findOne({email});  //checking user is already registered or not by email as email is unique
    if(userAvailable)  
    {
        res.status(400);
        throw new Error("User already registered");
    }

    // Check the number of registrations from the current IP
    const registrationCount = await User.countDocuments({ ip: userIp });
    if (registrationCount >= 2) {
      res.status(400);
      throw new Error("Registration limit reached for this device.");
    }

    // Send OTP to the user's email
    await sendEmail({ req , res });  

    // Store user details in session temporarily until OTP is verified
    req.session.userData = { username, email, phoneNo ,studentNo,branch,section,gender,scholarType,ip: userIp};
})


//@desc verifying otp and saving user on database in case of right otp
//@route POST /api/verify
//@access public
const verifyOtp = asyncHandler(async (req, res) => {
    const { otp } = req.body;

     // Convert otp to a string for comparison
     const otpString = String(otp);
     //console.log(otp);

    // Check if OTP matches the one stored in session
    if (req.session.otp && req.session.otp === otpString) {
        // Create a new user and save it to the database
        const newUser = new User(req.session.userData);
        await newUser.save();

        // Clear the session data after saving the user
        req.session.otp = null; 
        req.session.userData = null;

        res.status(200).json({ message: "OTP verified successfully and user registered!" });
    } else {
        res.status(400).json({ message: "Invalid OTP!" });
    }
});


module.exports={otpToUser,verifyOtp};