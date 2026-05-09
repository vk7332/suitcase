import { generateHearingNotes } from "../services/voiceNotes.service";
import { Request, Response } from 'express';

export const processVoiceNotes = async (req: Request, res: Response) => {
    try {
        const { transcript, caseId } = req.body;
        const tenantId = req.user.tenantId;

        const notes = await generateHearingNotes({
            transcript,
            caseId,
            tenantId,
        });

        res.json({ notes });
    } catch (err: any) {
        res.status(500).json({ error: "Voice processing failed" });
    }
};