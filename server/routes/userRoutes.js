const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  editEmail,
  editUsername,
  editPassword,
  getUsers,
  editPublic,
  getFollowing,
  follow,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddle");

router.post("/", registerUser);

router.post("/login", loginUser);
router.get("/getall", getUsers);
router.get("/get", protect, getUser);
router.get("/get/following", protect, getFollowing);

router.patch("/editemail", protect, editEmail);
router.patch("/editusername", protect, editUsername);
router.patch("/editpassword", protect, editPassword);
router.patch("/editpublic", protect, editPublic);
router.patch("/editfollowing/:id", protect, follow);

module.exports = router;
