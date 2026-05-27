import { liveCourtAssist } from "../services/live-court-service.ts";
import { Request, Response } from 'express';

export const getWhisper = async (req: Request, res: Response) => {
    const { text } = req.body;
    const result = await liveCourtAssist(text);
    res.json(result);
};