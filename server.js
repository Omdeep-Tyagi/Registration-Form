const express = require("express");
const app = express();
const errorHandler = require("./middleware/errorHandler");
const sessionOption= require("./middleware/sessionOptions");
const connectDb = require("./config/dbconnection");
const session = require('express-session');
const otpLimiter = require("./middleware/otpLimiter");
require("dotenv").config();
const path = require("path");
const flash = require("connect-flash");

connectDb();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));


app.set("trust proxy", 1); // Trust the first proxy //this help us to get the client ip address

app.use(session(sessionOption));
app.use(flash());

// Pass flash messages to every EJS template
app.use((req, res, next) => {
  res.locals.success= req.flash("success");
  res.locals.error= req.flash("error");
  next();
});


app.use(otpLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => { res.render("index"); });
app.use("/api", require("./routes/userRoute"));
app.use(errorHandler);

const port=process.env.PORT;
app.listen(port, () => {
  console.log("server is listening");
});