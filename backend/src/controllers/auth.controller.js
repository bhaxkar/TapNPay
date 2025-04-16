import { User } from "./models/User.model.js";
import zod from "zod";

const signupBody = zod.object({
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

export const signup = async (req, res) => {
  try {
    const validationResult = signupBody.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Incorrect inputs",
        error: result.error.errors,
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

const loginBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

export const login = async (req, res) => {
  try {
    const validationResult = loginBody.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Incorrect inputs",
        error: result.error.errors,
      });
    }

    const { email, password } = validationResult.data;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = User.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const jwtToken = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(201).json({
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
