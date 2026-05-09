import { generateWrittenArguments } from "../services/writtenArguments.service";
import { Request, Response } from 'express';

export const getWrittenArguments = (req: Request, res: Response) => {
    const { sections, caseData } = req.body;

    const document = generateWrittenArguments({
        sections,
        caseData,
    });

    res.json({ document });
};