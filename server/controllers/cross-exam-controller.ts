import { generateCrossExam } from "../services/cross-exam-service.ts";
import { Request, Response } from 'express';

export const getCrossExam = async (req: Request, res: Response) => {
    const { sections } = req.body;
    const lines = Array.isArray(sections) ? sections : [sections];
    const questions = await generateCrossExam(lines.filter(Boolean));

    res.json({ questions });
};
