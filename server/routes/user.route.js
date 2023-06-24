const express = require("express");
const userRouter = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);
const secret = "df0qu8nvou8dq2";

// Register: bcrypt and hashing passowrd
userRouter.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const isUserExist = await User.findOne({username})
  if(isUserExist) return res.status(400).json('Username already exist')

  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// login: create token & create cookie
userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      jwt.sign({ username, id: userDoc._id }, secret, {}, (error, token) => {
        if (error) throw error;
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json("Wrong credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Logout/ remove cookies
userRouter.post("/logout", (req, res) => {
  res.cookie("token", "").json("logout");
});

// to check login, verify token from backend to frontend Header Component
userRouter.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

module.exports = userRouter;
