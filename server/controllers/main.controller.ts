import { Request, Response } from "express";
import { convertToWrittenStatement } from "../services/conversion.service";
import { generateEvidenceAffidavit } from "../services/evidence.service";
import { generateTimeline } from "../services/timeline.service";
import { generateArguments } from "../services/arguments.service";
import { generatePdf } from "../services/pdf.service";
import { generateFinalArguments } from "../services/finalArguments.service";
import { generateWrittenArguments } from "../services/writtenArguments.service";
import { applyCitations } from "../services/citation.service";

export const generateFullCaseBundle = async (req: Request, res: Response) => {
    try {
        const { sections, caseData, exhibits } = req.body;

        // 1. Written Statement
        const wsSections = convertToWrittenStatement(sections);

        // 2. Evidence Affidavit
        const affidavit = generateEvidenceAffidavit({
            caseData,
            exhibits,
        });

        // 3. Timeline
        const timeline = generateTimeline(sections);

        // 4. Arguments
        const argumentsList = generateArguments(sections);

        const finalArgs = generateFinalArguments({
            sections,
            caseData,
        });

        const writtenArgs = generateWrittenArguments({
            sections,
            caseData,
        });
        const citedSections = applyCitations(sections);

        // 5. Generate PDF
        const pdfBuffer = await generatePdf({
            sections: wsSections, citedSections,
            affidavit,
            timeline,
            arguments: argumentsList, finalArgs,
            writtenArguments: writtenArgs,
        });

        res.setHeader("Content-Type", "application/pdf");
        res.send(pdfBuffer);

    } catch (err: any) {
        res.status(500).json({
            message: "Error generating case bundle",
            error: err.message,
        });
    }
};