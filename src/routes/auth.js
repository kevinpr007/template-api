import express from "express";
import jwt from "jsonwebtoken";
import HttpStatus from "http-status-codes"
import User from "../models/User";
import { sendResetPasswordEmail } from "../utils/mailer"; //TODO: change to utils

const router = express.Router();

router.post("/", (req, res) => {
  const { credentials } = req.body;

  User.findOne({ email: credentials.email }).then(user => {
    //TODO: Add confirmation email validation
    if (user && user.isValidPassword(credentials.password)) {
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({ errors: { global: "Invalid credentials" } }); //TODO: Create object in utils
    }
  });
});

router.post("/confirmation", (req, res) => {
  const { token } = req.body;
  User.findOneAndUpdate(
    { confirmationToken: token },
    { confirmationToken: "", confirmed: true },
    { new: true } //??????
  ).then(
    user => user ? res.json({ user: user.toAuthJSON() }) : 
    res.status(HttpStatus.BAD_REQUEST).json({ errors: { global: "The confirmation token is not valid" } })//TODO: Create object in utils
  );
});

router.post("/reset_password_request", (req, res) => {
    const { email } = req.body
  User.findOne({ email: email }).then(user => {
    if (user) {
      sendResetPasswordEmail(user); //TODO: Validate urls
      res.json({});
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({ errors: { global: "There is no user with this email" } }); //TODO: change this
    }
  });
});

router.post("/validate_token", (req, res) => {
    const { token } = req.body
  jwt.verify(token, process.env.JWT_SECRET, err => {
    if (err) {
      res.status(HttpStatus.UNAUTHORIZED).json({ errors: { global: "The token is not valid" } }); //TODO: Change
    } else {
      res.json({});
    }
  });
});

router.post("/reset_password", (req, res) => {
  const { password, token } = req.body.data;
  //TODO: Change token variable to other name
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(HttpStatus.UNAUTHORIZED).json({ errors: { global: "Invalid token" } }); //TODO: change
    } else {
      User.findOne({ _id: decoded._id }).then(user => {
        if (user) {
          //TODO: Add password lenght validation
          user.setPassword(password);
          user.save().then(() => res.json({}));
        } else {
          res.status(404).json({ errors: { global: "User not found" } }); //TODO: change
        }
      });
    }
  });
});

export default router;