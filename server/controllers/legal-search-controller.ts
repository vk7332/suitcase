import { searchLegalCases } from "../services/legal-search-service.js";
import { Request, Response } from 'express';

export const getLegalSearch = async (req: Request, res: Response) => {
    const { q } = req.query;

    const results = await searchLegalCases(q as string);

    res.json({ results });
};