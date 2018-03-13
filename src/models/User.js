import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import uniqueValidator from "mongoose-unique-validator";
import uuidv1 from 'uuid/v1';

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    passwordHash: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
    confirmationToken: { type: String, default: "" }
  },
  { timestamps: true }
);

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.isPasswordLength = function isPasswordLength(password = "") {
  return password.length >= process.env.PASSWORD_LENGTH
};

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS, 10));
};

schema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = uuidv1() 
};

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
  return `${process.env.HOST}:${process.env.API_PORT}/api/auth/confirmation?token=${this.confirmationToken}`;
};

schema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
  return `${process.env.HOST}:${process.env.API_PORT}/api/auth/reset_password?token=${this.generateResetPasswordToken()}`;
};

schema.methods.generateJWT = function generateJWT() {
  //TODO: Add all user object
    return jwt.sign(
    {
      email: this.email,
      username: this.username,
      confirmed: this.confirmed
    },
    process.env.JWT_SECRET
  );
};

schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRATION_TIME }
  );
};

schema.methods.toAuthJSON = function toAuthJSON() {
    //TODO: Add all user object
  return {
    email: this.email,
    confirmed: this.confirmed,
    username: this.username,
    token: this.generateJWT()
  };
};

//TODO: Test validation
// schema.plugin(uniqueValidator, {
//   message: "It is already taken, try another one."
// });

schema.plugin(uniqueValidator);

export default mongoose.model("User", schema);