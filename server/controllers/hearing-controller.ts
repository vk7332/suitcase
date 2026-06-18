import { Request, Response } from "express";
import { continueHearing, startHearing } from "../services/hearing-service.js";
import { hearingToDraft } from "../services/hearing-to-draft-service.js";
import { addToHistory, getMemory } from "../services/memory-service.js";
import { detectContradiction } from "../services/contradiction-service.js";
import { generateFollowUp } from "../services/followup-service.js";
import { generateCrossExamChain } from "../services/cross-exam-service.js";
import { decideStrategy } from "../services/strategy-service.js";
import { decideTiming } from "../services/timing-service.js";
import { scoreWeakness } from "../services/weakness-service.js";
import { calculateWinProbability } from "../services/win-probability-service.js";
import { detectJudgeMood } from "../services/judge-mood-service.js";
import { generateObjections } from "../services/objection-service.js";

export const hearingAssist = async (req: Request, res: Response) => {
    try {
        const { text, caseId, role = "opponent" } = req.body as {
            text: string;
            caseId: string;
            role?: "opponent" | "judge";
        };

        const memory = getMemory(caseId);
        const contradiction = detectContradiction(text, memory.history, memory.facts);
        const objectionResult = contradiction ? await generateObjections([text]) : { objections: [] };
        const objectionLine = objectionResult.objections?.[0]?.objection || null;
        const followUp = objectionLine
            ? await generateFollowUp(text, objectionLine, memory.facts)
            : null;
        const crossExam = await generateCrossExamChain(text, memory.facts);
        const strategy = decideStrategy({ text, contradiction, role });
        const timing = decideTiming({
            text,
            strategy: strategy.action,
            role,
            lastInterruptAt: (memory as any).lastInterruptAt,
        });
        const weakness = scoreWeakness(text);
        const win = calculateWinProbability({ weakness, contradiction, strategy });
        const judgeMood = role === "judge" ? detectJudgeMood(text) : null;

        addToHistory(caseId, `${role}: ${text}`);

        return res.json({
            contradiction,
            objectionLine,
            followUp,
            crossExam,
            strategy,
            timing,
            weakness,
            win,
            judgeMood,
        });
    } catch (error: any) {
        return res.status(500).json({ error: error.message || "Hearing assist failed" });
    }
};

export const hearingAssistV2 = hearingAssist;

export const start = async (req: Request, res: Response) => {
    const { sessionId, facts } = req.body;
    const data = await startHearing(sessionId, facts);
    res.json(data);
};

export const respond = async (req: Request, res: Response) => {
    const { sessionId, input } = req.body;
    const data = await continueHearing(sessionId, input);
    res.json(data);
};

export const convertHearing = async (req: Request, res: Response) => {
    const { transcript } = req.body;
    const draft = await hearingToDraft(transcript);
    res.json({ draft });
};
