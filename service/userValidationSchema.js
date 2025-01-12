const Joi = require('joi');

//without custom message, as Joi provides default error messages for each validation rule

const userValidationSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string()
  .email()
  .pattern(/@gmail\.com$/) // Must end with "@gmail.com"
  .required(),
  phoneNo: Joi.number()
      .integer() // Ensures it is an integer 
      .min(1000000000) // Minimum value to ensure it's at least 10 digits
      .max(9999999999) // Maximum value to ensure it's at most 10 digits
      .required(),
  studentNo: Joi.number()
      .integer()
      .custom((value, helpers) => {
        if (!value.toString().startsWith('23')) {
          return helpers.message('Student number must start with "23".');
        }
        return value;
      })
       .required(),
  branch: Joi.string().required(),
  section: Joi.string().required(),
  domain: Joi.string().required(),
  gender: Joi.string().valid('Male', 'Female' , 'Others') .required(),
  scholarType: Joi.string().valid('Day scholar', 'Hosteller').required()
});


module.exports=userValidationSchema;




