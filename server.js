const express = require("express");
const app = express();
const errorHandler = require("./middleware/errorHandler");
const sessionOption= require("./middleware/sessionOptions");
const connectDb = require("./config/dbconnection");
const session = require('express-session');
const otpLimiter = require("./middleware/otpLimiter");
require("dotenv").config();

connectDb();

app.set("trust proxy", 1); // Trust the first proxy
app.use(otpLimiter);
app.use(session(sessionOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./routes/userRoute"));
app.use(errorHandler);

const port=process.env.PORT;
app.listen(port, () => {
  console.log("server is listening");
});