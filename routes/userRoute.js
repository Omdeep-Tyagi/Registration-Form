const express=require("express");
const router=express.Router();
const { otpToUser } = require("../controllers/userController");

router.post("/otp", otpToUser);

module.exports=router;