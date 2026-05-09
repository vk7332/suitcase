import { generateArgumentsPdf } from "../services/pdf.service";
import { Request, Response } from 'express';

export const downloadArgumentsPdf = async (req: Request, res: Response) => {
    const { content } = req.body;

    const pdf = await generateArgumentsPdf(content);

    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(pdf));
};