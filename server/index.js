const express = require("express");
const app = express();
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

connectDB();

app.use("/goals", require("./routes/goalRoutes"));

app.use("/users", require("./routes/userRoutes"));

app.use("/timelines", require("./routes/timelineRoutes"));

app.use("/messages", require("./routes/messageRoutes"));

app.listen(8081, () => console.log("Server started"));
