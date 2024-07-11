const asyncHandler = require("express-async-handler");

const Goal = require("../model/goalModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

const postGoals = asyncHandler(async (req, res) => {
  try {
    const newGoal = await Goal.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
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

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

const deleteGoals = asyncHandler(async (req, res) => {
  try {
    const delGoal = await Goal.findByIdAndDelete(req.params.id);
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
