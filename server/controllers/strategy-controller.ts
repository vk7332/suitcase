import { decideStrategy } from "../services/strategy-service.js";
import { Request, Response } from 'express';

export const getStrategy = async (req: Request, res: Response) => {
    const { facts } = req.body;
    const result = decideStrategy({
        text: facts,
        contradiction: null,
        role: "opponent",
    });

    res.json(result);
};
