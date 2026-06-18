import express from "express";
import { processVoiceNotes } from "../controllers/voice-notes-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = express.Router();

router.post("/hearing-notes", authMiddleware, processVoiceNotes);

export default router;