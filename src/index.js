import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Promise from "bluebird";

//Routes Configuration Area
import auth from "./routes/auth";
import users from "./routes/users";

//Configuration Variables
dotenv.config();

//Setting Express App
const app = express();
app.use(bodyParser.json());

//Database Connection
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL);

//Setting Routes
app.use("/api/users", users);
app.use("/api/auth", auth);

//Set Main Page
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

//Start service
app.listen(process.env.API_PORT, () =>
  console.log(`Running on localhost:${process.env.API_PORT}`)
);
