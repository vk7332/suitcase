import { rankCaseLaws } from "../services/case-ranking-service.js";
import { Request, Response } from 'express';

export const rankCases = (req: Request, res: Response) => {
    const { cases, context } = req.body;

    const ranked = rankCaseLaws(cases, context);

    res.json({ ranked });
};