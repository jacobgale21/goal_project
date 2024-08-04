const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a name"],
    },
    description: {
      type: String,
      reqired: [true, "Please add a description"],
    },
    date: {
      type: Date,
      required: [true, "Please add a date"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: {
      type: String,
      required: [true, "Please add username"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
