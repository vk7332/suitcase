import express from "express";
import { createInvoice } from "../controllers/invoice-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { getInvoices } from "../controllers/invite-controller.js";

const router = express.Router();

router.post("/invoice/generate", authMiddleware, createInvoice);
router.get("/invoices", authMiddleware, getInvoices);

export default router;