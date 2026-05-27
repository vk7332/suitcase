import express from "express";
import { createSubscription } from "../controllers/subscription-controller.ts";
import { authMiddleware } from "../middleware/auth-middleware.ts";

const router = express.Router();

router.post("/subscription/create", authMiddleware, createSubscription);

export default router;