import { generateCrossQuestions } from "../services/crossExam.service";
import { Request, Response } from 'express';

export const getCrossExam = (req: Request, res: Response) => {
    const { sections } = req.body;

    const questions = generateCrossQuestions(sections);

    res.json({ questions });
};