import express, { NextFunction, Request, Response } from "express";
import { askAI } from "../controllers/ai-legal-controller.ts";
import { generateDraft } from "../controllers/ai-draft-controller.ts";
import { aiLimiter } from "../middleware/rate-limit";
import { multiDocAnalysis } from "../controllers/multi-doc-controller.ts";
import { getCourtArgument } from "../controllers/argument-controller.ts";
import { getLiveHelp } from "../controllers/live-assistant-controller.ts";
import { convertVoiceDraft } from "../controllers/voice-draft-controller.ts";
import { createSubmissionPDF } from "../controllers/submission-controller.ts";
import { createBundle } from "../controllers/bundle-controller.ts";
import { downloadBundle } from "../controllers/bundle-controller.ts";
import { getStrategy } from "../controllers/strategy-controller.ts";
import { judgeSimulation } from "../controllers/judge-sim-controller.ts";
import {
    start,
    respond,
    convertHearing,
    hearingAssist,
} from "../controllers/hearing-controller.ts";
import { getWhisper } from "../controllers/live-court-controller.ts";
import { generateFinalBundle } from "../controllers/final-submission-controller.ts";
import { getObjection } from "../controllers/objection-controller.ts";
import { getAnalytics } from "../controllers/analytics-controller.ts";
import { autopilot } from "../controllers/autopilot-controller.ts";
import { runAutoStep } from "../controllers/auto-execute-controller.ts";
import { lifecycle } from "../controllers/lifecycle-controller.ts";
import {
    createEvent,
    listEvents,
} from "../controllers/case-extra-controller.ts";
import { detectLimitation } from "../controllers/limitation-controller.ts";
import { getCauseList } from "../controllers/cause-list-controller.ts";
import { syncNextHearing } from "../controllers/calendar-controller.ts";
import { saveSubscription } from "../controllers/push-controller.ts";
import { startHearing } from "../services/hearing-service.ts";
import { downloadArgumentsPdf } from "../controllers/pdf-controller.ts";

const router = express.Router();

// 🔐 AI endpoints with rate limit
router.post("/ask-ai", aiLimiter, askAI);
router.post("/generate-draft", aiLimiter, generateDraft);
router.post("/multi-reason", multiDocAnalysis);
router.post("/court-argument", getCourtArgument);
router.post("/live-assist", getLiveHelp);
router.post("/live-assist", aiLimiter, getLiveHelp);
router.post("/voice-draft", convertVoiceDraft);
router.post("/generate-submission-pdf", createSubmissionPDF);
router.post("/generate-bundle", createBundle);
router.get("/download-bundle/:document_id", downloadBundle);
router.post("/strategy", getStrategy);
router.post("/judge-sim", judgeSimulation);
router.post("/hearing/start", start);
router.post("/hearing/respond", respond);
router.post("/live-court", getWhisper);
router.post("/hearing-to-draft", convertHearing);
router.post("/final-bundle", generateFinalBundle);
router.post("/detect-objection", getObjection);
router.post("/case-analytics", getAnalytics);
router.post("/autopilot", autopilot);
router.post("/auto/execute", runAutoStep);
router.post("/lifecycle", lifecycle);
router.post("/events", createEvent);
router.get("/events", listEvents);
router.post("/detect-limitation", detectLimitation);
router.post("/cause-list", getCauseList);
router.post("/sync-hearing", syncNextHearing);
router.post("/push/subscribe", saveSubscription);
router.post("/hearing-assist", hearingAssist);
router.post("/start-hearing", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sessionId, facts } = req.body;
        const result = await startHearing(sessionId, facts);
        res.json(result);
    } catch (error) {
        next(error);
    }
});
router.post("/arguments-pdf", downloadArgumentsPdf);

export default router;
