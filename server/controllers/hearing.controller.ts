import { Request, Response } from "express";
import {
    startHearing,
    continueHearing,
} from "../services/hearing.service";
import { hearingToDraft } from "../services/hearingToDraft.service";
import { openai } from "../config/openai";
import { getMemory, addToHistory } from "../services/memory.service";
import { detectContradiction } from "../services/contradiction.service";
import { aiCheckContradiction } from "../services/aiContradiction.service";
import { generateObjection } from "../services/objection.service";
import { generateFollowUp } from "../services/followup.service";
import { generateCrossExamChain } from "../services/crossExam.service";
import { decideStrategy } from "../services/strategy.service";
import { aiDecideStrategy } from "../services/aiStrategy.service";
import { decideTiming } from "../services/timing.service";
import { aiDecideTiming } from "../services/aiTiming.service";
import { scoreWeakness } from "../services/weakness.service";
import { aiScoreWeakness } from "../services/aiWeakness.service";
import { calculateWinProbability } from "../services/winProbability.service";
import { detectJudgeMood } from "../services/judgeMood.service";

export const hearingAssist = async (req: Request, res: Response) => {
    const { text, caseId, role } = req.body;

    const memory = getMemory(caseId);

    let contradiction = null;
    let objection = null;
    let followUp = null;
    let crossExam = null;

    if (role === "opponent") {
        // 🧠 detect contradiction
        contradiction = detectContradiction(text, memory.history, memory.facts);

        // 🧠 fallback AI check

        let objectionLine = null;
        if (contradiction) {
            objectionLine = await generateObjection(
                text,
                memory.facts,
                contradiction
            );
        }

        if (!contradiction) {
            contradiction = await aiCheckContradiction(
                text,
                memory.history,
                memory.facts
            );
        }

        if (contradiction) {
            objectionLine = await generateObjection(
                text,
                memory.facts,
                contradiction
            );
            followUp = await generateFollowUp(
                text,
                objectionLine,
                memory.facts
            );
        }
    }

    let strategy = decideStrategy({
        text,
        contradiction,
        role,
    });

    // AI refine (optional)
    if (strategy.action === "SILENT") {
        const ai = await aiDecideStrategy(text, memory.facts);
        strategy = ai;
    }
    if (role === "opponent") {
        // ⚡ fast check first
        contradiction = detectContradiction(
            text,
            memory.history,
            memory.facts
        );

        let timing = decideTiming({
            text,
            strategy: strategy.action,
            role,
            lastInterruptAt: memory.lastInterruptAt,
        });

        // AI refine only if needed
        if (timing.decision === "WAIT") {
            const ai = await aiDecideTiming(text, strategy.action);
            timing = ai;
        }

        // store interrupt time
        if (timing.decision === "INTERRUPT_NOW") {
            memory.lastInterruptAt = Date.now();
        }

        let weakness = scoreWeakness(text);

        // refine with AI if needed
        if (weakness.score > 30 && weakness.score < 70) {
            const ai = await aiScoreWeakness(text, memory.facts);
            weakness = {
                score: ai.score,
                level:
                    ai.score < 30
                        ? "WEAK"
                        : ai.score < 70
                            ? "MEDIUM"
                            : "STRONG",
                reason: ai.reason,
            };
        }

        let win = calculateWinProbability({
            weakness,
            contradiction,
            strategy,
        });

        let judgeMood = null;

        if (role === "judge") {
            judgeMood = detectJudgeMood(text);
        }
        const crossExamChain = await generateCrossExamChain(text, memory.facts);

        addToHistory(caseId, `${role}: ${text}`);

        res.json({
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

        if (condition) {

            return res.json({
                success: true
            });

        } else {

            return res.status(400).json({
                error: 'Failed'
            });

        }
        // 🧠 generate next suggestion for lawyer
        const suggestion = await openai.chat.completions.create({
            model: "gpt-5-mini",
            messages: [
                {
                    role: "system",
                    content: `You are a courtroom co-counsel. Based on the case facts and recent arguments, provide a concise suggestion for the lawyer's next move.`,
                },
                {
                    role: "user",
                    content: text,
                }
            ],
        });
        let suggestionText = "";

        try {
            const parsed = JSON.parse(
                suggestion.choices[0].message.content || "{}"
            );
            suggestionText = parsed.suggestion;
        } catch {
            suggestionText = suggestion.choices[0].message.content;
        }
        addToHistory(caseId, `AI: ${suggestionText}`);
        res.json({ suggestion: suggestionText });
    }
};

// ==============================   
// CREATE CASE
// ==============================
export const createCase = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { title, description } = req.body;

        const caseData = await createCase(user, title, description);
        res.json(caseData);
    } catch (error) {
        res.status(500).json({ error: "Failed to create case" });
    }
};

// ==============================
// GET ALL CASES
// ==============================
export const getCases = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const cases = await getCases(user);
        res.json(cases);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch cases" });
    }
};

export const hearingAssistV2 = async (req: Request, res: Response) => {
    const { text, caseId } = req.body;
    const memory = getMemory(caseId);

    const prompt = `
You are a courtroom co-counsel.

CASE FACTS:
${memory.facts}

RECENT CONTEXT:
${memory.history.join("\n")}

LIVE SPEECH:
"${text}"

Give:
✔ Short suggestion
✔ Objection (if any)
✔ Next line

Keep it concise.

Return JSON:
{
  "suggestion": "..."
}
`;

    const ai = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
    });

    let suggestion = "";

    try {
        const parsed = JSON.parse(
            ai.choices[0].message.content || "{}"
        );
        suggestion = parsed.suggestion;
    } catch {
        suggestion = ai.choices[0].message.content;
    }

    // 🧠 store conversation
    addToHistory(caseId, `LAWYER: ${text}`);
    addToHistory(caseId, `AI: ${suggestion}`);

    res.json({ suggestion });
};

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