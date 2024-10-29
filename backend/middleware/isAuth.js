import jwt from "jsonwebtoken";

import { JWT_ACCESS_SECRET } from "../config.js";

export function isAuth(req, res, next) {
  // const auth
  // console.log(req.headers);
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  // console.log(token);
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, JWT_ACCESS_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Invalid token", err: err.message });
    req.user = user;
    next();
  });
}
