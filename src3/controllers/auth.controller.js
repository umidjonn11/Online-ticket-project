import { User } from "../models/index.js";

export const authController = {
  async register(req, res, next) {
    try {
      const body = req.body;
      const user = new User(body);
      await user.save();

      user.password = "";

      res.status(201).json(user);
    } catch (error) {
      if (error.code === 11000) {
        error.message = "User already exists";
        error.code = 400;
        res.status(400).json(error);
        return;
      }
      next(error);
    }
  },
  async login(req, res, next) {
    try {
      const body = req.body;

      if (!body.username || !body.password) {
        throw new Error("Username and password are required");
      }

      const user = await User.findOne({
        username: body.username,
      });

      if (!user) {
        throw new Error("User not found");
      }

      const isMatch = await user.matchPassword(body.password);

      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      res.send(user);
    } catch (error) {
      next(error);
    }
  },
  async profile(req, res, next) {
    try {
      const query = req.query;
      if (!query.username || !query.password) {
        throw new Error("Username and password are required");
      }

      const user = await User.findOne({
        username: query.username,
      });

      if (!user) {
        throw new Error("User not found");
      }

      const isMatch = await user.matchPassword(query.password);

      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      res.send(user);
    } catch (error) {
      next(error);
    }
  },
};
