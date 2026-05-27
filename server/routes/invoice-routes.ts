import express from "express";
import { createInvoice } from "../controllers/invoice-controller.ts";
import { authMiddleware } from "../middleware/auth-middleware.ts";
import { getInvoices } from "../controllers/invite-controller.ts";

const router = express.Router();

router.post("/invoice/generate", authMiddleware, createInvoice);
router.get("/invoices", authMiddleware, getInvoices);

export default router;