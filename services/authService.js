import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Register service
export const register = async (data) => {
  const { name, email, password } = data;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return { message: "User already exists" };
  }

  const user = await User.create({ name, email, password });

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

// Login service
export const login = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    return { message: "Invalid credentials" };
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return { message: "Invalid credentials" };
  }

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};
