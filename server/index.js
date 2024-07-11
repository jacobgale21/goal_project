const express = require("express");
const app = express();
const colors = require("colors");
const connectDB = require("./config/db");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use("/goals", require("./routes/goalRoutes"));

app.use("/", require("./routes/goalRoutes"));
app.use("/:id", require("./routes/goalRoutes"));
app.use("/delete/:id", require("./routes/goalRoutes"));

app.listen(8081, () => console.log("Server started"));
