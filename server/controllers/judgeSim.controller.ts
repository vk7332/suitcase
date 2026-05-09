import { simulateJudge } from "../services/judgeSim.service";
import { Request, Response } from 'express';

export const judgeSimulation = async (req: Request, res: Response) => {
    const { facts, argumentsText } = req.body;

    const result = await simulateJudge(facts, argumentsText);

    res.json(result);
};