import express from "express";
import { processVoiceNotes } from "../controllers/voiceNotes.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/hearing-notes", authMiddleware, processVoiceNotes);

export default router;