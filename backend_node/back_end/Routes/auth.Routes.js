import express, { Router } from "express";
import { login, logout, signup } from "../Controllers/auth.Controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;