const User=require("../models/user");
const sendEmail=require("../service/sendEmail");
const asyncHandler= require("express-async-handler");


//@desc sending otp to user through mail
//@route POST /api/otp
//@access public
const otpToUser=asyncHandler(async(req,res)=>{
    const {username,email,phoneNo,studentNo,branch,section,gender,scholarType,domain} = req.body;
   

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

    // //When you refresh the page, the client might be sending a request to an endpoint (e.g., /api/send-otp) that generates the OTP again without proper validation checks.
    // //to overcome this, below is a condition
    // //Check if OTP already exists in the session
    if (req.session.otp) {
        req.flash("error", "OTP already sent to your mail!");
        return res.render('verify',{ success: req.flash("success"), error: req.flash("error") });
       //return res.status(200).json({ message: "OTP already sent." });
    }


    // Send OTP to the user's email
    await sendEmail({ req , res });  


    // Store user details in session temporarily until OTP is verified
    req.session.userData = { username, email, phoneNo ,studentNo,branch,section,gender,scholarType,domain,ip: userIp};

     // Success case (send OTP and show success flash)
     req.flash("success", "OTP sent successfully");
    //  res.render("/verify");
    res.render("verify",{ success: req.flash("success"), error: req.flash("error") });  // Correct usage without the leading slash

})


//@desc verifying otp and saving user on database in case of right otp
//@route POST /api/verify
//@access public
const verifyOtp = asyncHandler(async (req, res) => {
    const { otp } = req.body;

     // Convert otp to a string for comparison
     const otpString = String(otp);

    // Check if OTP matches the one stored in session
    if (req.session.otp && req.session.otp === otpString) {
        // Create a new user and save it to the database
        const newUser = new User(req.session.userData);
        await newUser.save();

        // Clear the session data after saving the user
        req.session.otp = null; 
        req.session.userData = null;

        // req.flash("success", "OTP verified successfully and user registered!");
        res.render("final",{ success: req.flash("success"), error: req.flash("error") });
        // res.status(200).json({ message: "OTP verified successfully and user registered!" });
    } else {
        req.flash("error", "Invalid OTP!");
        return res.render('verify',{ success: req.flash("success"), error: req.flash("error") });
        // res.status(400).json({ message: "Invalid OTP!" });
    }
});


module.exports={otpToUser,verifyOtp};