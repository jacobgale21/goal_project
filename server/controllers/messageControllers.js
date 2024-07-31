const asyncHandler = require("express-async-handler");
const Conversation = require("../model/conversationModel");
const Message = require("../model/messageModel");
const User = require("../model/userModel");

const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { message } = req.body;

    let conversation = await Conversation.findOne({
      users: { $all: [req.user.id, req.params.id] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        users: [req.user.id, req.params.id],
      });
    }
    const newMessage = await Message.create({
      senderId: req.user.id,
      receiverId: req.params.id,
      message: message,
      conversation: conversation._id,
      sender: req.user.username,
    });

    await Promise.all([newMessage.save(), conversation.save()]);

    res.status(201).json(newMessage);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "error sending message", err });
  }
});

//get messages with the params.id being the id of the receiver
const getMessages = asyncHandler(async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      users: { $all: [req.user.id, req.params.id] },
    });
    // res.status(200).json(conversation);
    const messages = await Message.find({
      conversation,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).json({ err: "Error in getting messages", err });
    console.log(err);
  }
});

const getMessage = asyncHandler(async (req, res) => {
  try {
    const { message } = await Message.findById(req.params.id);
    res.status(200).json(message);
  } catch (err) {
    res.status(400).json({ error: "Error getting message", err });
  }
});

module.exports = { sendMessage, getMessages, getMessage };
