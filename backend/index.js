import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { PORT, MONGODB_URL } from "./config.js";

import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

// app.use(routes)

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("App connected to Database");
    const server = app.listen(PORT);
    const io = new Server(server);
    io.on("connection", (socket) => {
      console.log("Client connected");
    });
  })
  .catch((err) => console.error(err));
