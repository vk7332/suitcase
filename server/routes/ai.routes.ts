import express, { NextFunction, Request, Response } from "express";
import { askAI } from "../controllers/aiLegal.controller";
import { generateDraft } from "../controllers/aiDraft.controller";
import { aiLimiter } from "../middleware/rateLimit";
import { multiDocAnalysis } from "../controllers/multiDoc.controller";
import { getCourtArgument } from "../controllers/argument.controller";
import { getLiveHelp } from "../controllers/liveAssistant.controller";
import { convertVoiceDraft } from "../controllers/voiceDraft.controller";
import { createSubmissionPDF } from "../controllers/submission.controller";
import { createBundle } from "../controllers/bundle.controller";
import { downloadBundle } from "../controllers/bundle.controller";
import { getStrategy } from "../controllers/strategy.controller";
import { judgeSimulation } from "../controllers/judgeSim.controller";
import {
    start,
    respond,
    convertHearing,
    hearingAssist,
} from "../controllers/hearing.controller";
import { getWhisper } from "../controllers/liveCourt.controller";
import { generateFinalBundle } from "../controllers/finalSubmission.controller";
import { getObjection } from "../controllers/objection.controller";
import { getAnalytics } from "../controllers/analytics.controller";
import { autopilot } from "../controllers/autopilot.controller";
import { runAutoStep } from "../controllers/autoExecute.controller";
import { lifecycle } from "../controllers/lifecycle.controller";
import {
    createEvent,
    listEvents,
} from "../controllers/caseExtra.controller";
import { detectLimitation } from "../controllers/limitation.controller";
import { getCauseList } from "../controllers/causeList.controller";
import { syncNextHearing } from "../controllers/calendar.controller";
import { saveSubscription } from "../controllers/push.controller";
import { startHearing } from "../services/hearing.service";
import { downloadArgumentsPdf } from "../controllers/pdf.controller";

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
