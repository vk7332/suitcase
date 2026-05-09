import { liveAssistant } from "../services/liveAssistant.service";
import { Request, Response } from 'express';

export const getLiveHelp = async (req: Request, res: Response) => {
    const { argument, context } = req.body;

    const result = await liveAssistant(argument, context);

    res.json(result);
};