import zod from "zod";
import { User } from "../models/user.model.js";
import { Account } from "../models/account.model.js";
import jwt from "jsonwebtoken";

const signupSchema = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
  firstName: zod.string().min(1, { message: "First name is required" }),
  lastName: zod.string().min(1, { message: "Last name is required" }),
  password: zod
    .string()
    .min(6, { message: "Password must be at least 8 characters" }),
});

export const signup = async (req, res) => {
  try {
    const validationResult = signupSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Incorrect inputs",
        error: validationResult.error.errors,
      });
    }

    const { email, firstName, lastName, password } = validationResult.data;

    const existingUser = await User.findOne({
      email: email,
    });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exist",
      });
    }

    const newUser = await User.create({
      email,
      firstName,
      lastName,
      password,
    });

    // Give the user a random balance between 1 and 10000.This is so we don’t have to integrate with banks and give them random balances to start with.
    const userId = newUser._id;
    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    const jwtToken = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "User created successfully",
      token: jwtToken,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const loginSchema = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod
    .string()
    .min(6, { message: "Password must be at least 8 characters" }),
});

export const login = async (req, res) => {
  try {
    const validationResult = loginSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Incorrect inputs fields",
        error: validationResult.error.errors,
      });
    }

    const { email, password } = validationResult.data;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const jwtToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "User Logged In successfully",
      token: jwtToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateProfileSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

export const updateUserProfile = async (req, res) => {
  const validationResult = updateProfileSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      message: "Incorrect inputs",
      error: validationResult.error.errors,
    });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.userId },
      validationResult.data,
      { new: true }
    ).select("-password");
    return res.status(200).json({
      message: "User details updated successfully",
      user: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to update user details",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find(req.queryFilter)
      .skip(req.pagination.skip)
      .limit(req.pagination.limit);

    return res.status(200).json({
      ...req.pageInfo,
      users: users.map((user) => ({
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      })),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Validate auth error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};