import express from "express";

import { postLogin, postSignUp } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", postLogin);
router.post("/signup", postSignUp);
export default router;
