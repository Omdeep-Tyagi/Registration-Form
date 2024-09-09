const userValidationSchema =require("../service/userValidationSchema");


const validateUser=(req,res,next)=>{
    let {error}=userValidationSchema.validate(req.body);
    if(error){
      res.status(400);
      throw new Error(error);
      //throw new Error(error.details.map(detail => detail.message).join(', '));
    }
    else next();
}

module.exports=validateUser;