const asyncHandler = require("express-async-handler");

const Goal = require("../model/goalModel");
const User = require("../model/userModel");
const Timeline = require("../model/timelineModel");

const getTimelines = asyncHandler(async (req, res) => {
  const timelines = await Timeline.find({ goal: req.params.goalid });
  res.status(200).json(timelines);
});

const postTimeline = asyncHandler(async (req, res) => {
  try {
    const newTimeline = await Timeline.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      user: req.user.id,
      goal: req.params.id,
    });

    res.status(200).json(newTimeline);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// const updateTimeline = asyncHandler(async (req, res) => {
//   const goal = await Goal.findById(req.params.id);

//   if (!goal) {
//     return res.status(400).json({ error: "Goal not found" });
//   }

//   const user = await User.findById(req.user.id);

//   if (!user) {
//     return res.status(401).json({ error: "User not found" });
//   }

//   if (goal.user.toString() !== user.id) {
//     return res.status(401).json({ error: "User not authorized" });
//   }

//   const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.status(200).json(updatedGoal);
// });

// const deleteGoals = asyncHandler(async (req, res) => {
//   try {
//     const delGoal = await Goal.findByIdAndDelete(req.params.id);

//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(401).json({ error: "User not found" });
//     }

//     if (delGoal.user.toString() !== user.id) {
//       return res.status(401).json({ error: "User not authorized" });
//     }
//   } catch (err) {
//     res.status(400).json({ error: err });
//   }

//   res.status(200).json({ id: req.params.id });
// });

// const editTitle = asyncHandler(async (req, res) => {
//   try {
//     const goal = await Goal.findById(req.params.id);
//     const title = req.body;

//     if (!goal) {
//       return res.status(400).json({ error: "Goal not found" });
//     }

//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(401).json({ error: "User not found" });
//     }

//     if (goal.user.toString() !== user.id) {
//       return res.status(401).json({ error: "User not authorized" });
//     }

//     const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, { title });
//     res.status(200).json(updatedGoal);
//   } catch (err) {
//     console.log("Error editing title", err);
//   }
// });

module.exports = {
  getTimelines,
  postTimeline,
  //   updateGoals,
  //   deleteGoals,
  //   editTitle,
};
