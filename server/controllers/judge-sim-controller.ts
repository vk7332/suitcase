import { simulateJudge } from "../services/judge-sim-service.ts";
import { Request, Response } from 'express';

export const judgeSimulation = async (req: Request, res: Response) => {
    const { facts, argumentsText } = req.body;

    const result = await simulateJudge(facts, argumentsText);

    res.json(result);
};