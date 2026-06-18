import { generateParaWiseReply } from "../services/reply-service.js";
import { Request, Response } from 'express';

export const paraWiseReply = (req: Request, res: Response) => {
    const { sections } = req.body;

    const reply = generateParaWiseReply(sections);

    res.json({ reply });
};