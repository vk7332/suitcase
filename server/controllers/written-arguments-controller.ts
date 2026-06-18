import { generateWrittenArguments } from "../services/written-arguments-service.js";
import { Request, Response } from 'express';

export const getWrittenArguments = (req: Request, res: Response) => {
    const { sections, caseData } = req.body;

    const document = generateWrittenArguments({
        sections,
        caseData,
    });

    res.json({ document });
};