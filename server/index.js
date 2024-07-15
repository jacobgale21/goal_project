const express = require("express");
const app = express();
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use("/goals", require("./routes/goalRoutes"));

app.use("/users", require("./routes/userRoutes"));

app.listen(8081, () => console.log("Server started"));
