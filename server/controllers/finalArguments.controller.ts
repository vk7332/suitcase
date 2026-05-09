import { generateFinalArguments } from "../services/finalArguments.service";
import { Request, Response } from 'express';

export const getFinalArguments = (req: Request, res: Response) => {
    const { sections, caseData } = req.body;

    const script = generateFinalArguments({
        sections,
        caseData,
    });

    res.json({ script });
};