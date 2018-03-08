import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Promise from "bluebird";

// import auth from "./routes/auth";
// import users from "./routes/users";

dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL);

// app.use("/api/auth", auth);
// app.use("/api/users", users);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(process.env.API_PORT, () =>
  console.log(`Running on localhost:${process.env.API_PORT}`)
);
