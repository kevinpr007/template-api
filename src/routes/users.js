import express from "express";
import HttpStatus from "http-status-codes"
import User from "../models/User";
import parseErrors from "../utils/parseErrors";
import globalError from '../utils/globalError';
import { sendConfirmationEmailValidation } from "../utils/mailer";
import authenticate from "../middlewares/authenticate";

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password, username } = req.body.user;

  const user = new User({ email, username });
  if(user.isPasswordLength(password)){
    user.setPassword(password);
    user.setConfirmationToken();
    user.save()
      .then(userRecord => {
        sendConfirmationEmailValidation(userRecord);
        res.json({ user: userRecord.toAuthJSON() });
      })
      .catch(err => res.status(HttpStatus.BAD_REQUEST).json(globalError("Error saving User", parseErrors(err.errors) )));
  }
  else{
    res.status(HttpStatus.BAD_REQUEST).json(globalError(`You have entered less than ${process.env.PASSWORD_LENGTH} characters for password`))
  }
});

router.get("/current_user", authenticate, (req, res) => {
  res.json({
    //TODO: Add all user object
    user: {
      email: req.currentUser.email,
      confirmed: req.currentUser.confirmed,
      username: req.currentUser.username
    }
  });
});

export default router;