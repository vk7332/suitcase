import express from "express";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

// ❗ always last
app.use(errorHandler);

export default app;
