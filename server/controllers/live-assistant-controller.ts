import { liveAssistant } from "../services/live-assistant-service.ts";
import { Request, Response } from 'express';

export const getLiveHelp = async (req: Request, res: Response) => {
    const { argument, context } = req.body;

    const result = await liveAssistant(argument, context);

    res.json(result);
};