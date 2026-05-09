import { generateStrategy } from "../services/strategy.service";
import { Request, Response } from 'express';

export const getStrategy = async (req: Request, res: Response) => {
    const { facts } = req.body;

    const result = await generateStrategy(facts);

    res.json(result);
};