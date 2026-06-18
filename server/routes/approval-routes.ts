import express from "express";
import {
    getPendingApprovals,
    approveAction,
    rejectAction,
} from "../controllers/approval-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = express.Router();

router.get("/approvals", authMiddleware, getPendingApprovals);
router.post("/approvals/approve", authMiddleware, approveAction);
router.post("/approvals/reject", authMiddleware, rejectAction);

export default router;