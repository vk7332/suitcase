import { aiLegalResearch } from "../services/ai-legal-service.js";
import { Request, Response } from 'express';

export const askAI = async (req: Request, res: Response) => {
    const { query } = req.body;

    const result = await aiLegalResearch(query);

    res.json(result);
};