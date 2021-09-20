const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

require("../db/conn");
const User = require("../model/userSchema.js");

router.get("/", (req, res) => {
  res.send("hello router");
});
// register route
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ message: `plz enter the required field` });
  }
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(422).json({ message: "email already exists" });
    } else if (password !== cpassword) {
      return res.status(422).json({ message: "password does not match" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      // save krne se pehle passwrd hashing using bcrypt

      await user.save();

      res.status(201).json({ message: "user registered succcessfully" });
    }
  } catch (err) {
    res.send(err);
  }
});

// Login route

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "plz fill the data" });
    }
    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      console.log(token);

      if (email && isMatch) {
        res.json("login successfull");
      } else {
        res.status(400).json({ message: "invalid credentials" });
      }
    } else {
      res.status(400).json({ message: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// getting list of users
router.get("/users", async (req, res) => {
  try {
    const user = await User.find();
    console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
