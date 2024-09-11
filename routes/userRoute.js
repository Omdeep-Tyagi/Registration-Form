const express=require("express");
const router=express.Router();
const { otpToUser,verifyOtp } = require("../controllers/userController");
const validateUser=require("../middleware/validateUser");


router.post("/otp",validateUser, otpToUser);
router.post("/verify",verifyOtp);

module.exports=router;