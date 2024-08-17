const express = require("express");
const mongoose = require("mongoose");
const Form = require("./models/form.js");
const app = express();

const MONGO_URL = "mongodb://127.0.0.1:27017/form";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// app.get("/verify",(req,res)=>{
//     let {username,email,phoneno}=req.params;
//     // OTP concept!
// })

app.use((req, res) => {
  console.log("Listen the Request!");
  res.send("For Testing!");
});

app.listen(8080, () => {
  console.log("server is listening");
});
