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
  getFollowers,
  getNonFollowers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddle");

router.post("/", registerUser);

router.post("/login", loginUser);
router.get("/getall", getUsers);
router.get("/get", protect, getUser);
router.get("/get/following", protect, getFollowing);
router.get("/get/followers", protect, getFollowers);
router.get("/get/nonfollowers", protect, getNonFollowers);

router.patch("/editfollowing/:id", protect, follow);
router.patch("/editemail", protect, editEmail);
router.patch("/editusername", protect, editUsername);
router.patch("/editpassword", protect, editPassword);
router.patch("/editpublic", protect, editPublic);

module.exports = router;
