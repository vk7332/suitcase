import { analyzeCaseStrength } from "../services/case-strength-service.js";
import { Request, Response } from 'express';

export const getCaseStrength = (req: Request, res: Response) => {
    const { sections } = req.body;

    const result = analyzeCaseStrength(sections);

    res.json(result);
};