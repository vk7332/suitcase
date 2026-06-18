import { generateCrossStrategy } from "../services/cross-strategy-service.js";
import { Request, Response } from 'express';

export const getCrossStrategy = (req: Request, res: Response) => {
    const { sections } = req.body;

    const strategy = generateCrossStrategy(sections);

    res.json({ strategy });
};