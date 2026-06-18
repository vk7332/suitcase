import express from "express";
import {
    createSubscription,
    razorpayWebhook,
} from "../controllers/billing-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { getUsage } from "../controllers/usage-controller.js";

const router = express.Router();

router.post("/billing/subscribe", authMiddleware, createSubscription);

// webhook (no auth)
router.post("/billing/webhook", razorpayWebhook);

router.get("/usage", authMiddleware, getUsage);

export default router;