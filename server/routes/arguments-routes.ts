import express from "express";
import { createArguments } from "../controllers/argument-controller.ts";
import { authMiddleware } from "../middleware/auth-middleware.ts";

const router = express.Router();

router.post("/generate", authMiddleware, createArguments);

export default router;
