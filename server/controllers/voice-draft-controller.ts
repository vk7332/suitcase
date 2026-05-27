import { voiceToDraft } from "../services/voice-draft-service.ts";
import { Request, Response } from 'express';

export const convertVoiceDraft = async (req: Request, res: Response) => {
    const { text } = req.body;

    const draft = await voiceToDraft(text);

    res.json({ draft });
};