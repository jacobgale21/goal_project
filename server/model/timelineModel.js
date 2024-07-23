const mongoose = require("mongoose");

const timelineSchema = mongoose.Schema(
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Goal",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Timeline", timelineSchema);
