const express = require("express");
const app = express();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbconnection");
require("dotenv").config();

//connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./routes/userRoute"));
app.use(errorHandler);


const port=process.env.PORT;
app.listen(port, () => {
  console.log("server is listening");
});
