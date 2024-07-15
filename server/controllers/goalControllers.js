const asyncHandler = require("express-async-handler");

const Goal = require("../model/goalModel");
const User = require("../model/userModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

const postGoals = asyncHandler(async (req, res) => {
  try {
    const newGoal = await Goal.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      user: req.user.id,
    });

    res.status(200).json(newGoal);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400).json({ error: "Goal not found" });
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  if (goal.user.toString() !== user.id) {
    return res.status(401).json({ error: "User not authorized" });
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

const deleteGoals = asyncHandler(async (req, res) => {
  try {
    const delGoal = await Goal.findByIdAndDelete(req.params.id);

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (delGoal.user.toString() !== user.id) {
      return res.status(401).json({ error: "User not authorized" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }

  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getGoals,
  postGoals,
  updateGoals,
  deleteGoals,
};
