require("dotenv").config();
const MongoStore = require('connect-mongo');



const store= MongoStore.create({
  mongoUrl: process.env.CONNECTION_STRING,
  crypto: {
      secret: process.env.SECRET_KEY
  },
  touchAfter: 24 * 3600 
});

store.on("error", ()=>{
  throw new Error("Error in Mongo Session Store");
})

const sessionOptions={
    store,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { 
      expires: Date.now() + 5 * 60 * 1000,
        maxAge: 5 * 60 * 1000, // 5 minutes
        httpOnly: true,
    }
  };

module.exports=sessionOptions;