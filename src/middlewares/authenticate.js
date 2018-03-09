import jwt from "jsonwebtoken";
import HttpStatus from "http-status-codes"
import User from "../models/User";

export default (req, res, next) => {
  const header = req.headers.authorization;
  const TOKEN_PARAMETER = 1
  
  let token;
  if (header) token = header.split(" ")[TOKEN_PARAMETER];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(HttpStatus.UNAUTHORIZED).json({ errors: { global: "Invalid token" } }); //TODO: Add object
      } else {
        //TODO: Check validation all times.
        User.findOne({ email: decodedToken.email }).then(user => {
          req.currentUser = user;
          next();
        });
      }
    });
  } else {
    res.status(HttpStatus.UNAUTHORIZED).json({ errors: { global: "No token found" } }); //TODO: Add object
  }
};