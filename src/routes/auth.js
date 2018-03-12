import express from "express";
import jwt from "jsonwebtoken";
import HttpStatus from "http-status-codes"
import uuidv1 from 'uuid/v1';
import User from "../models/User";
import { 
  sendResetPasswordEmailValidation, 
  sendResetPasswordEmail, 
  sendConfirmationEmail } from "../utils/mailer";
import globalError from '../utils/globalError';
import parseErrors from "../utils/parseErrors";

const router = express.Router();

router.post("/", (req, res) => {
  const { credentials } = req.body;

  User.findOne({ email: credentials.email }).then(user => {
    if (user && user.isValidPassword(credentials.password)) {
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json(globalError("Invalid credentials"));
    }
  });
});

router.get("/confirmation", (req, res) => {
  const { token } = req.query;

  User.findOneAndUpdate(
    { confirmationToken: token },
    { confirmationToken: "", confirmed: true },
    { new: true } //TODO: ??????   { runValidators: true, context: 'query' } 
  ).then(user => {
      if(user){
        sendConfirmationEmail(user)
        res.json({ user: user.toAuthJSON() })
      }
      else{
        res.status(HttpStatus.BAD_REQUEST).json(globalError("The confirmation token is not valid"))
      }
    }
  );
});

router.post("/reset_password_request", (req, res) => {
    const { email } = req.body
  User.findOne({ email: email }).then(user => {
    if (user) {
      sendResetPasswordEmailValidation(user);
      user.setPassword(uuidv1())
      user.save()
        .then(() => {
          res.json({});
        })
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json(globalError("Error saving User", parseErrors(err.errors) )));
    } else {
      res.status(HttpStatus.BAD_REQUEST).json(globalError("There is no user with this email"));
    }
  });
});

router.post("/validate_token", (req, res) => {
    const { token } = req.body
  jwt.verify(token, process.env.JWT_SECRET, err => {
    if (err) {
      res.status(HttpStatus.UNAUTHORIZED).json(globalError("The token is not valid"))
    } else {
      res.json({});
    }
  });
});

router.post("/reset_password", (req, res) => {
  const { password, token } = req.body.data;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(HttpStatus.UNAUTHORIZED).json(globalError("Invalid token"))
    } else {
      User.findOne({ _id: decoded._id }).then(user => {
        if (user) {
          //TODO: Add password lenght validation
          user.setPassword(password);
          user.save()
          .then(userRecord => {
            sendResetPasswordEmail(userRecord)
            res.json({})
          })
          .catch(err => res.status(HttpStatus.BAD_REQUEST).json(globalError("Error saving User", parseErrors(err.errors) )));
        } else {
          res.status(HttpStatus.NOT_FOUND).json(globalError("User not found"))
        }
      });
    }
  });
});

export default router;