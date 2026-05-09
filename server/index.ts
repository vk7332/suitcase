// server/index.ts
import dotenv from 'dotenv';
import 'dotenv/config'; // This must be line 1
import express, { Request, Response, NextFunction } from 'express';
import { supabase } from "./config/supabase";
import cors from "cors";

import webhookRoutes from "./routes/webhook.routes";
import shareRoutes from "./routes/share.routes";
import caseRoutes from "./routes/case.routes";
import notificationRoutes from "./routes/notification.routes";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import organizationRoutes from "./routes/organization.routes";
import inviteRoutes from "./routes/invite.routes";
import paymentRoutes from "./routes/payment.routes";
import invoiceRoutes from "./routes/invoice.routes";
import complianceRoutes from "./routes/compliance.routes";
import approvalRoutes from "./routes/approval.routes";
import clientRoutes from "./routes/client.routes";
import documentRoutes from "./routes/document.routes";
import { errorHandler } from "./middleware/errorHandler";
import aiRoutes from "./routes/ai.routes";
import "./jobs/reminder.job";

dotenv.config({ path: '../.env' }); // Tells Node to look one folder up for the .env

const app = express(); void 0;

app.use(helmet());

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
    })
);
// 🔹 MIDDLEWARE
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());

app.use(morgan("combined"));

// 🔹 HEALTH CHECK
app.get("/", (req, res) => {
    res.send("SUITCASE Backend Running 🚀");
});

// 🔴 MUST COME FIRST (before json)
app.use("/api/webhook/razorpay", express.raw({ type: "*/*" }));

// normal middleware
app.use(express.json());

// routes
app.use("/api/webhook/razorpay", webhookRoutes);

app.use(errorHandler);

// 🔹 ROUTES
app.use("/api", organizationRoutes);
app.use("/api", inviteRoutes);
app.use("/api", shareRoutes);
app.use("/api", caseRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api", organizationRoutes);
app.use("/api", inviteRoutes);
app.use("/api", shareRoutes);
app.use("/api", paymentRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", complianceRoutes);
app.use("/api", approvalRoutes);
app.use("/api", clientRoutes);
app.use("/api", documentRoutes);
app.use("/documents", documentRoutes);
app.use("/api", aiRoutes);

// 🔹 GLOBAL ERROR HANDLER (basic)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
});

// 🔹 SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});