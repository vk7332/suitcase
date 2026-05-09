import { generateCourtArgument } from "../services/argumentGenerator.service";
import { Request, Response } from 'express';
import { generateWrittenArguments } from "../services/arguments.service";

export const createArguments = async (req: Request, res: Response) => {
    try {
        const { notes } = req.body;

        const result = await generateWrittenArguments(notes);

        res.json({ content: result });
    } catch (err: any) {
        res.status(500).json({ error: "Argument generation failed" });
    }
};

export const getCourtArgument = async (req: Request, res: Response) => {
    const { query } = req.body;

    const script = await generateCourtArgument(query);

    res.json({ script });
};