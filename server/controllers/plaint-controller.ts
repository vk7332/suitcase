import { generatePlaintTemplate } from "../services/vplaint-service.js";
import { Request, Response } from 'express';
import { supabaseAdmin } from "../config/supabase.js";
import { generatePdf } from "../services/pdf-service.js";

export const generatePlaint = async (req: Request, res: Response) => {
    const { case_id } = req.params;

    const { data: caseData } = await supabaseAdmin
        .from("cases")
        .select("*")
        .eq("id", case_id)
        .single();

    const plaint = generatePlaintTemplate({ caseData });

    const paragraphs = plaint.sections.flatMap((section: any) => section.content || []);
    const pdfBuffer = await generatePdf({ paragraphs, document: caseData });

    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
};
