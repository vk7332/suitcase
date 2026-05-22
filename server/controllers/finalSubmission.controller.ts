import { generateFinalSubmission } from "../services/finalSubmission.service";
import { Request, Response } from 'express';
import { generateFilingBundle } from "../services/bundlePdf.service";

export const generateFinalBundle = async (req: Request, res: Response) => {
  const { transcript, caseTitle, advocateName } = req.body;

  const submission = await generateFinalSubmission(transcript);

  const bundle = await generateFilingBundle({
    caseTitle,
    advocateName,
    mainContent: submission || "",
    annexures: [
      { title: "Hearing Transcript", content: transcript },
    ],
  });

  res.download(bundle.filePath, bundle.fileName);
};
