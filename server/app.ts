import express from "express";
import authRoutes from "./routes/auth-routes.ts";
import { errorHandler } from "./middleware/error-handler";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

// ❗ always last
app.use(errorHandler);

export default app;
