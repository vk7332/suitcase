import { getNextStep } from "../services/autopilot.service";
import { Request, Response } from 'express';

export const autopilot = async (req: Request, res: Response) => {
    const { facts, stage, lastAction } = req.body;

    const result = await getNextStep({
        facts,
        stage,
        lastAction,
    });

    res.json(result);
};