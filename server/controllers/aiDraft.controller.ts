import { generateDraftFromQuery } from "../services/aiDraft.service";
import { Request, Response } from 'express';

export const generateDraft = async (req: Request, res: Response) => {
    const { query, type } = req.body;

    const draft = await generateDraftFromQuery(query, type);

    res.json({ draft });
};