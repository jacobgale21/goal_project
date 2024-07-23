const express = require("express");
const router = express.Router();
router.use(express.json());
const {
  getTimelines,
  postTimeline,
  //   updateGoals,
  //   deleteGoals,
  //   editTitle,
} = require("../controllers/timelineControllers");

const { protect } = require("../middleware/authMiddle");

router.get("/get/:goalid", protect, getTimelines);

router.post("/create/:id", protect, postTimeline);

module.exports = router;
