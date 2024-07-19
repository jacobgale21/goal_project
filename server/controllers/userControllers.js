const jwt = require("jsonwebtoken"); // => jwt used to securely send information between two parties
//verifies the authenticy of json information
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please enter all information" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    //Salt => Making random string, hash => runs through hashing algorithm
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = User.create({
      username,
      email,
      password: hashPass,
    });

    if (newUser) {
      res.status(201).json({
        _id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        token: generateToken(newUser._id),
      });
    } else {
      return res.status(400).json({ error: "error with register" });
    }
  } catch (err) {
    console.log("error is here", err);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ error: "error with register" });
    }
  } catch (err) {
    console.log(err);
  }
});

const getUser = asyncHandler(async (req, res) => {
  const { _id, username, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    username,
    email,
  });
});

const editUsername = asyncHandler(async (req, res) => {
  try {
    const { username } = req.body;
    const { user } = await User.findByIdAndUpdate(req.user.id, {
      username: username,
    });
    res.status(200).json({ message: username });
  } catch (err) {}
});

const editEmail = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const { user } = await User.findByIdAndUpdate(req.user.id, {
      email: email,
    });
    res.status(200).json({ message: email });
  } catch (err) {
    console.log(err);
  }
});

const editPassword = asyncHandler(async (req, res) => {
  try {
    const { username, password, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (await bcrypt.compare(password, user.password)) {
      //bcrypting new password
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(newPassword, salt);

      const { editUser } = await User.findByIdAndUpdate(req.user.id, {
        password: hashPass,
      });
    } else {
      return res.status(401).json({ error: "User or password does not match" });
    }
    res.status(201).json({ message: "successful password edit" });
  } catch (err) {
    res.status(401).json({ error: "Error in editing pasword", err });
    console.log("Error in editing password", err);
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  editUsername,
  editEmail,
  editPassword,
};
