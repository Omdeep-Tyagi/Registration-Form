// const rateLimit = require('express-rate-limit');

// //configuration

// // Rate Limiter Setup// help us to limit the number of request from a single ip address
// const otpLimiter = rateLimit({
//     windowMs: 1 * 60 * 1000, // 1 minutes
//     max: 5, // Limit each IP to 5 requests per `window` (here, per 1 minutes)
//     message: 'Too many requests from this IP, please try again after 1 minutes.',
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//   });

// module.exports=otpLimiter;

const rateLimit = require('express-rate-limit');

// Rate Limiter Setup
const otpLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per `window` (here, per 1 minute)
    handler: (req, res, next) => {

        const retryAfter = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000);
        req.flash('error', `Too many requests. Please try again after ${retryAfter} seconds.`);
        
        // Render the page with the error message
        res.render('index', { error: `Too many requests. Please try again after ${retryAfter} seconds.` });
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = otpLimiter;
