const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");

export async function signUp(req, res, next) {
  try {
    const { username, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username: username,
      password: hashpassword,
    });
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

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "incorrect user or passowrd",
      });
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      res.status(200).json({
        status: "success",
      });
    } else {
      return res.status(201).json({
        status: "fail",
        message: "incorrect user or passowrd",
      });
    }
  } catch (err) {
    res.status(200).json({
      status: "fail",
    });
  }
}
