import express from "express";
import { createArguments } from "../controllers/argument-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = express.Router();

router.post("/generate", authMiddleware, createArguments);

export default router;
