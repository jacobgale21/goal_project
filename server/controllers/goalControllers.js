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
      username: req.user.username,
    });

    res.status(200).json(newGoal);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    return res.status(400).json({ error: "Goal not found" });
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

const getGoal = asyncHandler(async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    res.status(200).json(goal);
  } catch (err) {
    res.status(400).json({ error: "Error getting goal", err });
  }
});

const getUserGoals = asyncHandler(async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.params.id });
    res.status(200).json(goals);
  } catch (err) {
    res.status(400).json({ error: "Error in getting user goals" });
    console.log(err);
  }
});

const editTitle = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;
    const { goal } = await Goal.findByIdAndUpdate(req.params.id, {
      title: title,
    });
    res.status(200).json(goal);
  } catch (err) {
    res.status(400).json({ error: "Error changing title", err });
  }
});

const editDescription = asyncHandler(async (req, res) => {
  try {
    const { description } = req.body;
    const { goal } = await Goal.findByIdAndUpdate(req.params.id, {
      description: description,
    });
    res.status(200).json(goal);
  } catch (err) {
    res.status(400).json({ error: "Error changing description", err });
  }
});

const editDate = asyncHandler(async (req, res) => {
  try {
    const { date } = req.body;
    const { goal } = await Goal.findByIdAndUpdate(req.params.id, {
      date: date,
    });
    res.status(200).json(goal);
  } catch (err) {
    res.status(400).json({ error: "Error changing date", err });
  }
});

const getPosts = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const following = user.following;

    const goals = await Goal.find({ user: { $in: following } });
    res.status(200).json(goals);
  } catch (err) {
    res.status(400).json({ error: "Error in getting posts" });
  }
});

module.exports = {
  getGoals,
  postGoals,
  updateGoals,
  deleteGoals,
  getGoal,
  editTitle,
  editDate,
  editDescription,
  getUserGoals,
  getPosts,
};
