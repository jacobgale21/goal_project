const mongo_url =
  "mongodb+srv://jacobgale2003:2354Jg2003@goal-react.luugqoy.mongodb.net/";

const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(mongo_url)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
