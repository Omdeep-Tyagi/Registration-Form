const nodemailer = require("nodemailer");
const generateOtp = require("./generateOtp");
const asyncHandler = require("express-async-handler");

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASSWORD

    },
});

const sendEmail= asyncHandler(async({email , res})=>{ 
    
    const otp= generateOtp();

    const receiver = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your OTP for Registration",
        text: `Your OTP is : ${otp}`, 
    };

    await transporter.sendMail(receiver, (error, emailResponse) => {
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
