import express from "express";
import {
    createSubscription,
    razorpayWebhook,
} from "../controllers/billing-controller.ts";
import { authMiddleware } from "../middleware/auth-middleware.ts";
import { getUsage } from "../controllers/usage-controller.ts";

const router = express.Router();

router.post("/billing/subscribe", authMiddleware, createSubscription);

// webhook (no auth)
router.post("/billing/webhook", razorpayWebhook);

router.get("/usage", authMiddleware, getUsage);

export default router;