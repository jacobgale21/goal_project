const express = require("express");
const router = express.Router();
router.use(express.json());
const {
  getGoals,
  postGoals,
  updateGoals,
  deleteGoals,
  getGoal,
  editTitle,
  editDescription,
  editDate,
} = require("../controllers/goalControllers");

const { protect } = require("../middleware/authMiddle");

router.get("/get", protect, getGoals);
router.get("/get/:id", protect, getGoal);

router.post("/", protect, postGoals);

router.put("/:id", protect, updateGoals);

router.delete("/delete/:id", protect, deleteGoals);

router.patch("/edittitle/:id", protect, editTitle);
router.patch("/editdescription/:id", protect, editDescription);
router.patch("/editdate/:id", protect, editDate);

module.exports = router;
