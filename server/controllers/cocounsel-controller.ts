import { runCoCounsel } from "../services/cocounsel-service.ts";
import { Request, Response } from 'express';
import { getMemory, addToHistory } from "../services/memory-service.ts";
import { logAction } from "../services/log-service.ts";
import { applyCompliance } from "../services/compliance-service.ts";

export const coCounsel = async (req: Request, res: Response) => {
    try {
        const { text, caseId, role } = req.body;

        const memory = getMemory(caseId);

        const result = await runCoCounsel({
            text,
            role,
            memory,
        });
        const compliantResult = applyCompliance(result);

        // 🧠 update memory
        addToHistory(caseId, `${role}: ${text}`);

        // 📝 audit log (CRITICAL for court safety)
        logAction({
            caseId,
            input: text,
            output: compliantResult,
        });

        return res.json(compliantResult);

    } catch (err: any) {
        console.error(err);
        return res.status(500).json({
            error: "Co-counsel processing failed",
        });
    }
};