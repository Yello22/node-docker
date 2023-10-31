const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

async function signUp(req, res, next) {
  try {
    const { username, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username: username,
      password: hashpassword,
    });
    req.session.user = newUser;
    res.status(200).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(200).json({
      status: "fail",
    });
  }
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "incorrect user or password",
      });
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      req.session.user = user;
      res.status(200).json({
        status: "success",
      });
    } else {
      return res.status(201).json({
        status: "fail",
        message: "incorrect user or password",
      });
    }
  } catch (err) {
    res.status(200).json({
      status: "fail",
    });
  }
}

module.exports = {
  signUp,
  login,
};
