import { generateJudgeObjections } from "../services/judgeSimulator.service";
import { Request, Response } from 'express';

export const getJudgeSimulation = (req: Request, res: Response) => {
    const { sections } = req.body;

    const qa = generateJudgeObjections(sections);

    res.json({ qa });
};