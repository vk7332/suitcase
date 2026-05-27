import express from "express";
import { processVoiceNotes } from "../controllers/voice-notes-controller.ts";
import { authMiddleware } from "../middleware/auth-middleware.ts";

const router = express.Router();

router.post("/hearing-notes", authMiddleware, processVoiceNotes);

export default router;