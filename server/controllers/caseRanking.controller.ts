import { rankCaseLaws } from "../services/caseRanking.service";
import { Request, Response } from 'express';

export const rankCases = (req: Request, res: Response) => {
    const { cases, context } = req.body;

    const ranked = rankCaseLaws(cases, context);

    res.json({ ranked });
};