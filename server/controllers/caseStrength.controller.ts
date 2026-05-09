import { analyzeCaseStrength } from "../services/caseStrength.service";
import { Request, Response } from 'express';

export const getCaseStrength = (req: Request, res: Response) => {
    const { sections } = req.body;

    const result = analyzeCaseStrength(sections);

    res.json(result);
};