const express = require("express");
const router = express.Router();
router.use(express.json());
const {
  getGoals,
  postGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalControllers");

const { protect } = require("../middleware/authMiddle");

router.get("/get", protect, getGoals);

router.post("/", protect, postGoals);

router.put("/:id", protect, updateGoals);

router.delete("/delete/:id", protect, deleteGoals);

module.exports = router;
