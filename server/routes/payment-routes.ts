import express from "express";
import { getPayments } from "../controllers/payment-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = express.Router();

router.get("/payments", authMiddleware, getPayments);

export default router;