import { autoExecute } from "../services/auto-execute-service.js";
import { Request, Response } from 'express';

export const runAutoStep = async (req: Request, res: Response) => {
    const { step } = req.body;

    const result = await autoExecute(step);

    res.json(result);
};