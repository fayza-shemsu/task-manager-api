import * as authService from "../services/authService.js";
import { validationResult } from "express-validator";

export const register = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const result = await authService.register(req.body);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const result = await authService.login(req.body);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
