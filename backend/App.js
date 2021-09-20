const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3300;

dotenv.config({ path: "./config.env" });
require("./db/conn");

app.use(require("./router/auth"));

//middleware

// const middleware = (req, res, next) => {
//   console.log("this is middleware");
//   next();
// };

// app.get("/", (req, res) => {
//   res.send("Hello");
// });
// app.get("/contact", (req, res) => {
//   res.send("contact page");
// });
// app.get("/about", (req, res) => {
//   res.send("about page");
// });
// app.get("/signUp", (req, res) => {
//   res.send("signUp");
// });
// app.get("/logIn", (req, res) => {
//   res.send("logIn");
// });
app.listen(port, () => {
  console.log("listening at 3300");
});
