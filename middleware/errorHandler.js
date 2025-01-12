const constants={
    VALIDATION_ERROR:400,
    UNAUTHORIZED:401,
    FORBIDDEN:403,
    NOT_FOUND:404,
    SERVER_ERROR:500,
};


const errorHandler =(err,req,res,next)=>{
    const statusCode= res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            req.flash('error',err.message);
            // res.json({title:"Validation Failed", message : err.message ,stackTrace: err.stack});
            return res.redirect('/');
            break;
        case constants.NOT_FOUND:
            // res.json({title:"Not Found",message : err.message ,stackTrace: err.stack}); 
            req.flash('error',err.message);
            return res.redirect('/');
            break;
        case constants.UNAUTHORIZED:
            // res.json({title:"Unauthorized",message : err.message ,stackTrace: err.stack}); 
            req.flash('error',err.message);
            return res.redirect('/');
            break; 
        case constants.FORBIDDEN:
            // res.json({title:"Forbidden",message : err.message ,stackTrace: err.stack}); 
            req.flash('error',err.message);
            return res.redirect('/');
            break; 
        case constants.SERVER_ERROR:
            // res.json({title:"Server Error",message : err.message ,stackTrace: err.stack}); 
            req.flash('error',err.message);
            return res.redirect('/');
            break;     
        default:
            // res.json({
            //     title: "Error",
            //     message: err.message || "An unexpected error occurred",
            //     stackTrace: err.stack,
            // });
            req.flash('error',err.message);
            return res.redirect('/');
            break;       

    }
};

module.exports=errorHandler;