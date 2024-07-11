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
      type: String,
      required: [true, "Please add a date"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
