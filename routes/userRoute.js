const express=require("express");
const router=express.Router();
const { otpToUser,verifyOtp } = require("../controllers/userController");

router.post("/otp", otpToUser);
router.post("/verify",verifyOtp);

module.exports=router;