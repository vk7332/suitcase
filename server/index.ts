// server/index.ts

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import shareRoutes from "./routes/share.routes";
import caseRoutes from "./routes/case.routes";
import notificationRoutes from "./routes/notification.routes";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

app.use(helmet());

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
    })
);

if (!caseId || !status) {
    return res.status(400).json({ error: "invalid input" });
}

dotenv.config();

const app = express();
app.use("/api/notification", notificationRoutes);

// 🔹 MIDDLEWARE
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());


// 🔹 HEALTH CHECK
app.get("/", (req, res) => {
    res.send("SUITCASE Backend Running 🚀");
});

// 🔹 ROUTES
app.use("/api", shareRoutes);
app.use("/api", caseRoutes);

// 🔹 GLOBAL ERROR HANDLER (basic)
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
});

// 🔹 SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});