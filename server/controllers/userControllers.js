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

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Error in getting users", err });
  }
});

const editPublic = asyncHandler(async (req, res) => {
  try {
    const { public } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        public: public,
      },
      { new: true }
    );
    res.status(200).json(user.public);
  } catch (err) {
    res.status(400).json({ error: "Error in changing public", err });
  }
});

const follow = asyncHandler(async (req, res) => {
  try {
    const sender = await User.findById(req.user.id);
    const receiver = await User.findById(req.params.id);

    const follow = sender.following.includes(req.params.id);

    if (!follow) {
      sender.following.push(req.params.id);
      receiver.followers.push(req.user.id);
    }

    await Promise.all([sender.save(), receiver.save()]);

    res.status(200).json(sender);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Error in editing following", err });
  }
});

const getFollowing = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({
      followers: { $all: [req.user.id] },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: "Error in getting following" });
    console.log(err);
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
  getUsers,
  editPublic,
  follow,
  getFollowing,
};
