import { multiDocLegalReasoning } from "../services/multiDocReasoning.service";
import { Request, Response } from 'express';

export const multiDocAnalysis = async (req: Request, res: Response) => {
    const { query } = req.body;

    const result = await multiDocLegalReasoning(query);

    res.json(result);
};