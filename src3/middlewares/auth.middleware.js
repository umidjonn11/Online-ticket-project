import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
export const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(403).send("Authorization is required!");
      return;
    }

    const [type, token] = req.headers.authorization.split(" ");

    if (type !== "Bearer") {
      res.status(403).send("wrong authorization type");
      return;
    }

    const decode = await jwt.verify(token, process.env.ACCESS_TOKEN);

    const user = await User.findById(decode.sub);

    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;

    next();
  } catch (error) {
    res.send(error);
  }
};
