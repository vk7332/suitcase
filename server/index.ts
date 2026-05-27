// server/index.ts
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import fs from 'fs';
import path from 'path';

// Routes
import webhookRoutes from "./routes/webhook-routes";
import shareRoutes from "./routes/share-routes";
import caseRoutes from "./routes/case-routes";
import notificationRoutes from "./routes/notification-routes";
import organizationRoutes from "./routes/organization-routes";
import inviteRoutes from "./routes/invite-routes";
import paymentRoutes from "./routes/payment-routes";
import invoiceRoutes from "./routes/invoice-routes";
import complianceRoutes from "./routes/compliance-routes";
import approvalRoutes from "./routes/approval-routes";
import clientRoutes from "./routes/client-routes";
import documentRoutes from "./routes/document-routes";
import aiRoutes from "./routes/ai-routes";

// Config & Middleware
import { errorHandler } from "./middleware/error-handler";
import "./jobs/reminder-job";
import app from "./app.js";

dotenv.config();

console.log("-----------------------------------------");
console.log("🚀 SUITCASE BACKEND STARTING...");
console.log("📅 Build Time:", new Date().toISOString());
console.log("📦 Version: 1.0.4-cjs-stable");
try {
    const distPath = path.join(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
        console.log("📂 Files in dist:", fs.readdirSync(distPath));
    } else {
        console.log("📂 dist folder not found at:", distPath);
    }
} catch (e) {
    console.log("📂 Could not list dist files");
}
console.log("-----------------------------------------");

app.get("/", (req, res) => {
  res.status(200).send("SUITCASE Backend Running");
});

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

// 🔹 MIDDLEWARE
app.use(helmet());
app.use(morgan("combined"));
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
}));

// 🔹 RATE LIMITING
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
    })
);

// 🔴 WEBHOOK RAW BODY (MUST COME BEFORE express.json())
app.use("/api/webhook/razorpay", express.raw({ type: "application/json" }));

// 🔹 STANDARD PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 HEALTH CHECK (Moved up for Railway)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.status(200).send("SUITCASE Backend Running");
});

// 🔹 SERVER START
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ SUITCASE Backend is live on port ${PORT}`);
  console.log(`📡 Health check available at: /health`);
});

// 🔹 ERROR HANDLING
app.use(errorHandler);

// Global Unhandled Rejection/Exception Handlers
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

// 🔹 ROUTES
app.use("/api/webhook", webhookRoutes);
app.use("/api", organizationRoutes);
app.use("/api", inviteRoutes);
app.use("/api", shareRoutes);
app.use("/api", caseRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api", paymentRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", complianceRoutes);
app.use("/api", approvalRoutes);
app.use("/api", clientRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api", aiRoutes);
