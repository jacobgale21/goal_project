const express = require("express");
const router = express.Router();
router.use(express.json());
const {
  getGoals,
  postGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalControllers");

router.get("/goals", getGoals);

router.post("/", postGoals);

router.put("/:id", updateGoals);

router.delete("/delete/:id", deleteGoals);

module.exports = router;
