import express from "express";
import {
    createSubscription,
    razorpayWebhook,
} from "../controllers/billing.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { getUsage } from "../controllers/usage.controller";

const router = express.Router();

router.post("/billing/subscribe", authMiddleware, createSubscription);

// webhook (no auth)
router.post("/billing/webhook", razorpayWebhook);

router.get("/usage", authMiddleware, getUsage);

export default router;