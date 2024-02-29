import { UserModel } from "../models/user.model.js";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import "dotenv/config";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const salt = await bcryptjs.genSalt(10);

    const passwordHash = await bcryptjs.hash(hashPassword, salt);

  
    const newUser = new UserModel({
      username,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    return res
      .status(200)
      .json({ message: "User created successfully", savedUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordValid = await bcryptjs.compare(password, user.password);

    if (!passwordValid) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      data: {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        email: user.email,
        accessToken: token,
      },
      message: "User logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
