import { generateDraftFromQuery } from "../services/ai-draft-service.ts";
import { Request, Response } from 'express';

export const generateDraft = async (req: Request, res: Response) => {
    const { query, type } = req.body;

    const draft = await generateDraftFromQuery(query, type);

    res.json({ draft });
};