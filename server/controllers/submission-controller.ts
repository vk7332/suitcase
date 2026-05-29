import { generateSubmissionPDF } from "../services/submission-pdf-service.ts";
import { Request, Response } from 'express';

export const createSubmissionPDF = async (req: Request, res: Response) => {
    const { content, caseTitle, advocateName } = req.body;

    const { filePath, fileName } =
        await generateSubmissionPDF(
            content,
            caseTitle,
            advocateName
        );

    res.download(filePath, fileName);
};