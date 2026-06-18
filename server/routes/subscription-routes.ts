import express from "express";
import { createSubscription } from "../controllers/subscription-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = express.Router();

router.post("/subscription/create", authMiddleware, createSubscription);

export default router;