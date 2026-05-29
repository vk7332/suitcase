import express from "express";
import { getPayments } from "../controllers/payment-controller.ts";
import { authMiddleware } from "../middleware/auth-middleware.ts";

const router = express.Router();

router.get("/payments", authMiddleware, getPayments);

export default router;