import { Request, Response } from "express";
import { convertToWrittenStatement } from "../services/conversion-service.js";
import { generateEvidenceAffidavit } from "../services/evidence-service.js";
import { generateWrittenArguments as generateArgumentText } from "../services/arguments-service.js";
import { generatePdf } from "../services/pdf-service.js";
import { generateFinalArguments } from "../services/final-arguments-service.js";
import { generateWrittenArguments as generateWrittenArgumentsDoc } from "../services/written-arguments-service.js";
import { applyCitations } from "../services/citation-service.js";

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
        const timeline = sections;

        // 4. Arguments
        const argumentsList = await generateArgumentText(
            Array.isArray(sections) ? sections : [JSON.stringify(sections)]
        );

        const finalArgs = generateFinalArguments({
            sections,
            caseData,
        });

        const writtenArgs = generateWrittenArgumentsDoc({
            sections,
            caseData,
        });
        const citedSections = applyCitations(sections);

        // 5. Generate PDF
        const paragraphs = [
            ...wsSections.flatMap((section: any) => section.content || []),
            ...citedSections.flatMap((section: any) => section.content || []),
            ...(Array.isArray(affidavit?.content) ? affidavit.content : []),
            ...(Array.isArray(timeline) ? timeline.map((item: any) => JSON.stringify(item)) : []),
            typeof argumentsList === "string" ? argumentsList : JSON.stringify(argumentsList),
            typeof finalArgs === "string" ? finalArgs : JSON.stringify(finalArgs),
            typeof writtenArgs === "string" ? writtenArgs : JSON.stringify(writtenArgs),
        ];
        const pdfBuffer = await generatePdf({ paragraphs: paragraphs.filter(Boolean), document: caseData });

        res.setHeader("Content-Type", "application/pdf");
        res.send(pdfBuffer);

    } catch (err: any) {
        res.status(500).json({
            message: "Error generating case bundle",
            error: err.message,
        });
    }
};
