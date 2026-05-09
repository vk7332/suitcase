import { generateFilingBundle } from "../services/bundlePdf.service";
import { Request, Response } from 'express';

export const createBundle = async (req: Request, res: Response) => {
    const result = await generateFilingBundle(req.body);
    res.download(result.filePath, result.fileName);
};