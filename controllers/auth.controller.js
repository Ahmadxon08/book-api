const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = async (req, res) => {
  try {
    const allUsers = await User.find();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      count: allUsers.length,
      data: allUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

const user = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const { oldPsw, newPsw } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordTrue = await bcrypt.compare(oldPsw, user.password);

    if (!isPasswordTrue) {
      return res.status(400).json({
        success: false,
        message: "Invalid password, try with a different one",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const newHashPassword = await bcrypt.hash(newPsw, salt);
    user.password = newHashPassword;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "password updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "password upadation failed in change endpoint",
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Existing user, try  a different one",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassoword = await bcrypt.hash(password, salt);
    const newCreatedUser = new User({
      username,
      email,
      password: hashedPassoword,
      role: role || "user",
    });

    await newCreatedUser.save();
    if (newCreatedUser) {
      res.status(201).json({
        success: true,
        message: "User created successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to create user",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Register failed in regester endpoint",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid username",
      });
    }
    const isPasswordTrue = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordTrue) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    const accessToken = jwt.sign(
      {
        userId: existingUser._id,
        username: username,
        role: existingUser.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      },
    );

    res.status(200).json({
      success: true,
      message: "Login successfully",
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Login failed in login endpoint",
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
  users,
  user,
  changePassword,
};
