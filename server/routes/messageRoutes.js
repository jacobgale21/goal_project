const express = require("express");
const router = express.Router();
router.use(express.json());

const {
  sendMessage,
  getMessages,
  getMessage,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddle");

router.post("/post/:id", protect, sendMessage);

router.get("/getmessages/:id", protect, getMessages);
router.get("/get/:id", protect, getMessage);

module.exports = router;
