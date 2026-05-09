import express from "express";
import { getPayments } from "../controllers/payment.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/payments", authMiddleware, getPayments);

export default router;