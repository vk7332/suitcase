import { generateFilingBundle } from "../services/bundle-pdf-service.ts";
import { Request, Response } from 'express';

export const createBundle = async (req: Request, res: Response) => {
    const result = await generateFilingBundle(req.body);
    res.download(result.filePath, result.fileName);
};

export const downloadBundle = createBundle;
