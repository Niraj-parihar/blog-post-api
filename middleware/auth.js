const express = require("express");
const User = require("../models/User.js");
const router = new express.Router();

//REGISTER
router.post("/register", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//user login route
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
