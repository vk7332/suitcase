import express from "express";
import { createSubscription } from "../controllers/subscription.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/subscription/create", authMiddleware, createSubscription);

export default router;