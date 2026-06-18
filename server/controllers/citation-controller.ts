import { applyCitations } from "../services/citation-service.js";
import { Request, Response } from 'express';

export const addCitations = (req: Request, res: Response) => {
    const { sections } = req.body;

    const enhanced = applyCitations(sections);

    res.json({ sections: enhanced });
};