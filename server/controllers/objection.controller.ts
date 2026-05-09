import { detectObjection } from "../services/objection.service";
import { Request, Response } from 'express';

export const getObjection = async (req: Request, res: Response) => {
    const { text } = req.body;

    const result = await detectObjection(text);

    res.json(result);
};