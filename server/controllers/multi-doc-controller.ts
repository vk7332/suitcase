import { multiDocLegalReasoning } from "../services/multi-doc-reasoning-service.js";
import { Request, Response } from 'express';

export const multiDocAnalysis = async (req: Request, res: Response) => {
    const { query } = req.body;

    const result = await multiDocLegalReasoning(query);

    res.json(result);
};