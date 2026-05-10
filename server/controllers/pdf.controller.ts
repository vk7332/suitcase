import { generatePdf } from "../services/pdf.service";
import { Request, Response } from 'express';

export const downloadArgumentsPdf = async (req: Request, res: Response) => {
    const { content } = req.body;
    const paragraphs = Array.isArray(content) ? content : [content];
    const pdf = await generatePdf({ paragraphs: paragraphs.filter(Boolean) });

    res.setHeader("Content-Type", "application/pdf");
    res.send(pdf);
};
