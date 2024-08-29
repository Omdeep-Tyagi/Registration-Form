const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const generateOtp = require("./generateOtp");


const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASSWORD

    },
});

const sendEmail= asyncHandler(async({req , res})=>{ 

    const otp= generateOtp();

    // Store OTP in session
    req.session.otp = otp;
    req.session.email = req.body.email;

    const receiver = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Your OTP for Registration",
        text: `Your OTP is : ${otp}`, 
    };

    transporter.sendMail(receiver, (error, emailResponse) => {
        if (error){
             res.status(500);
             throw new Error(error);
        }
        else{
            console.log("OTP sent successfully!");
            res.status(200).json({ message: "OTP sent successfully!"});
        }    
    });
});


module.exports=sendEmail;
