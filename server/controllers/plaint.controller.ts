import { generatePlaintTemplate } from "../services/plaint.service";
import { Request, Response } from 'express';
import { generatePdf } from "../services/pdf.service";

export const generatePlaint = async (req: Request, res: Response) => {
    const { case_id } = req.params;

    const { data: caseData } = await supabaseAdmin
        .from("cases")
        .select("*")
        .eq("id", case_id)
        .single();

    const plaint = generatePlaintTemplate({ caseData });

    const pdfBuffer = await generatePdf({
        sections: plaint.sections,
        cause: plaint.causeTitle,
        document: caseData,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
};