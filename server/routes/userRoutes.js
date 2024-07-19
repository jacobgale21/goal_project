const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  editEmail,
  editUsername,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddle");

router.post("/", registerUser);

router.post("/login", loginUser);
router.get("/get", protect, getUser);
router.patch("/editemail", protect, editEmail);
router.patch("/editusername", protect, editUsername);

module.exports = router;
