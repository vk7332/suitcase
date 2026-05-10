import express from "express";
import { createInvoice } from "../controllers/invoice.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { getInvoices } from "../controllers/invite.controller";

const router = express.Router();

router.post("/invoice/generate", authMiddleware, createInvoice);
router.get("/invoices", authMiddleware, getInvoices);

export default router;