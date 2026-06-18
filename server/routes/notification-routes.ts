// server/routes/notification.routes.ts

import express from "express";
import { fetchPreferences, savePreferences } from "../controllers/notification-controller.js";

const router = express.Router();

router.get("/notification/:userId", fetchPreferences);
router.post("/notification", savePreferences);

export default router;