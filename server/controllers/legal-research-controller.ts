import { legalResearch } from "../services/legal-research-service.js";
import { Request, Response } from 'express';

export const askLegalAI = async (req: Request, res: Response) => {
    const { query } = req.body;

    const result = await legalResearch(query);

    res.json(result);
};