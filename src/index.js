import express from "express";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import HttpStatus from "http-status-codes"
import globalError from './utils/globalError';

//Routes Configuration Area
import auth from "./routes/auth";
import users from "./routes/users";

//Configuration Variables
dotenv.config();

//Setting Express App
const app = express();
app.use(bodyParser.json());

//Database Connection
import connectToDB from './config/mongoose';
connectToDB()

//Setting Routes
app.use("/api/users", users);
app.use("/api/auth", auth);

//Set static Pages
app.use(express.static('public'))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/*", (req, res) => {
  res.status(HttpStatus.NOT_FOUND).json()
});

//Start service
app.listen(process.env.API_PORT, () =>
  console.log(`Running on ${process.env.HOST}:${process.env.API_PORT}`)
);
