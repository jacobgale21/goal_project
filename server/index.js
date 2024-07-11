const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/goals", require("./routes/goalRoutes"));

app.use("/", require("./routes/goalRoutes"));
app.use("/:id", require("./routes/goalRoutes"));

app.listen(8081, () => console.log("Server started"));
