import express from "express";
import { createArguments } from "../controllers/arguments.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/generate", authMiddleware, createArguments);

export default router;