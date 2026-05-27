import { generateObjections } from "../services/objection-service.ts";
import { Request, Response } from 'express';

export const getObjection = async (req: Request, res: Response) => {
    const { text } = req.body;
    const lines = Array.isArray(text) ? text : [text];
    const result = await generateObjections(lines.filter(Boolean));

    res.json(result);
};
