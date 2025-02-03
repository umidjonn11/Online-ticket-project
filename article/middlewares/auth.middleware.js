import { User } from "../models/index.js";

export const authMiddleware = async (req, res, next) => {
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [username, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");

  const currentUser = await User.findOne({
    username: username,
  });
  if (
    username &&
    password &&
    currentUser &&
    (await currentUser.matchPassword(password))
  ) {
    req.user = { username, password };
    return next();
  }

  res.set("WWW-Authenticate", 'Basic realm="401"');
  res.status(401).send("Authentication required");
};
