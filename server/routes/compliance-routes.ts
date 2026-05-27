import express from "express";
import {
    cancelInvoice,
    createCreditNote,
    getAuditLogs,
} from "../controllers/compliance-controller.ts";
import { authMiddleware } from "../middleware/auth-middleware.ts";

const router = express.Router();

router.post("/invoice/cancel", authMiddleware, cancelInvoice);
router.post("/credit-note", authMiddleware, createCreditNote);
router.get("/audit-logs", authMiddleware, getAuditLogs);

export default router;