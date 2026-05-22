import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import webhookRoutes from "./routes/webhook.routes";
import shareRoutes from "./routes/share.routes";
import caseRoutes from "./routes/case.routes";
import notificationRoutes from "./routes/notification.routes";
import organizationRoutes from "./routes/organization.routes";
import inviteRoutes from "./routes/invite.routes";
import paymentRoutes from "./routes/payment.routes";
import invoiceRoutes from "./routes/invoice.routes";
import complianceRoutes from "./routes/compliance.routes";
import approvalRoutes from "./routes/approval.routes";
import clientRoutes from "./routes/client.routes";
import documentRoutes from "./routes/document.routes";
import aiRoutes from "./routes/ai.routes";

import { errorHandler } from "./middleware/errorHandler";
import "./jobs/reminder.job";

const app = express();
const PORT = Number(process.env.PORT) || 8080;
const NODE_ENV = process.env.NODE_ENV || "development";
const FRONTEND_URL = process.env.FRONTEND_URL;

const allowedOrigins = FRONTEND_URL
    ? FRONTEND_URL.split(",").map((origin) => origin.trim()).filter(Boolean)
    : [];

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(
    helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
    })
);

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
                callback(null, true);
                return;
            }

            callback(new Error(`CORS blocked origin: ${origin}`));
        },
        credentials: true,
    })
);

app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
    })
);

// Razorpay signature verification needs the untouched request body.
app.use("/api/webhook/razorpay", express.raw({ type: "application/json" }));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
        name: "SUITCASE API",
        status: "running",
        environment: NODE_ENV,
    });
});

app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
});

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

app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
    process.exit(1);
});

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled rejection:", reason);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("SUITCASE backend started");
    console.log(`Environment: ${NODE_ENV}`);
    console.log(`Port: ${PORT}`);
    console.log("Health check: /health");
});
