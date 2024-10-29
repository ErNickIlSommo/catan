import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/user.js";
import { JWT_ACCESS_SECRET, JWT_EXPIRES_IN } from "../config.js";

const salt = 12;

export function postLogin(req, res, next) {
  const { username, password } = req.body;

  User.findOne({ username: username })
    .then((user) => {
      if (!user) return res.json(400).json({ message: "User not found" });
      bcryptjs
        .compare(password, user.password)
        .then((result) => {
          if (!result)
            return res.status(400).json({ message: "invalid password" });
          const token = jwt.sign(
            { username: user.username, userId: user._id },
            JWT_ACCESS_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
          );
          res.status(200).json({ message: "Succesful login" });
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}

export function postSignUp(req, res, next) {
  const { username, password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return res.status(401).json({ message: "Passwords must coincide" });
  User.findOne({ username: username })
    .then((user) => {
      if (user) return res.status(400).json({ message: "User already exists" });
      bcryptjs
        .hash(password, salt)
        .then((hashedPassword) => {
          const newUser = new User({
            username: username,
            password: password,
          });
          return newUser.save();
        })
        .then((result) => {
          console.log(result);
          res.status(201).json({ message: "user registered succesfully" });
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}
