import { supabase } from "../config/supabase";
import { Request, Response } from 'express';
import { generateAuditPDF } from "../utils/generateAuditPdf";
import { generateAuditPdf } from "../services/pdf.service";
import { authenticate } from "../middleware/auth.middleware";
import { saveAuditReport } from "../services/report.service";
import { supabaseAdmin } from "../config/supabase";
import { parseCertificate } from "../utils/certificate.util";
import { generateAuditPdf } from "../services/pdf.service";
import { attachHashToLog } from "../services/hashLog.service";
import { generate65BCertificate } from "../services/certificate65B.service";
import { getMemory } from "../services/memory.service";

export const generateAudit = async (req: Request, res: Response) => {
    try {
        const { caseId, logs, advocateName } = req.body;

        // 🔐 hash logs
        const logsWithHash = logs.map(attachHashToLog);

        // 📄 65B certificate
        const certificate = generate65BCertificate({
            caseId,
            logs: logsWithHash,
            generatedBy: advocateName,
        });

        // 📦 generate PDF
        const pdfBuffer = await generateAuditPdf({
            caseId,
            logs: logsWithHash,
            certificate,
            advocateName,
        });

        res.setHeader("Content-Type", "application/pdf");
        res.send(pdfBuffer);

    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: "Audit generation failed" });
    }
};

export const recordAuditLog = async (req: Request, res: Response) => {
    try {
        const { document_id, action, details } = req.body;
        const userId = req.user.id;

        await supabaseAdmin.from("audit_logs").insert({
            document_id,
            user_id: userId,
            action,
            details,
        });

        res.json({ message: "Audit log recorded successfully" });
    } catch (err: any) {
        res.status(500).json({ error: "Failed to record audit log" });
    }
};

export const getAuditLogs = async (req: Request, res: Response) => {
    try {
        const { document_id } = req.params;
        const { data } = await supabase
            .from("audit_logs")
            .select("*")
            .eq("document_id", document_id)
            .order("created_at", { ascending: true });
        res.json({ document_id, logs: data });
    } catch (err: any) {
        res.status(500).json({ error: "Failed to fetch audit logs" });
    }
};
export const exportDocumentAccessLogs = async (req: Request, res: Response) => {
    try {
        const { document_id } = req.params;
        const { data } = await supabase
            .from("document_access_logs")
            .select("*")
            .eq("document_id", document_id)
            .order("created_at", { ascending: true });

        res.json({
            document_id,
            total_events: data.length,
            logs: data,
        });

    } catch (err: any) {
        res.status(500).json({ error: "Export failed" });
    }
};

export const coCounselAudit = async (req: Request, res: Response) => {
    try {
        const { text, caseId } = req.body;
        const memory = getMemory(caseId);

        const { data } = await supabase
            .from("document_access_logs")
            .select("*")
            .eq("document_id", document_id)
            .order("created_at", { ascending: true });

        // basic validation
        if (!data || data.length === 0) {
            return res.json({ valid: false });
        }

        return res.json({
            valid: true,
            document_id,
            total_events: data.length,
        });

    } catch (err: any) {
        res.status(500).json({ valid: false });
    }
};

export const finalizeAudit = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const { hash, signature, certificate } = req.body;

        const { data: user } = await supabaseAdmin
            .from("users")
            .select("chamber_id, full_name")
            .eq("id", userId)
            .single();

        const certInfo = parseCertificate(certificate);

        const pdf = await generateAuditPdf({
            chamber_id: user.chamber_id,
            user_name: user.full_name,
            signature,
            certificate,
            certInfo,
        });

        await saveAuditReport({
            chamber_id: user.chamber_id,
            hash,
            signature,
            certificate,
        });

        const txHash = await anchorHash(hash);

        await supabaseAdmin.from("audit_logs").insert({
            chamber_id,
            hash,
            tx_hash: txHash,
        });
        res.setHeader("Content-Type", "application/pdf");
        res.send(pdf);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const downloadAuditReport = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        // fetch user details
        const { data: user } = await supabaseAdmin
            .from("users")
            .select("chamber_id, full_name")
            .eq("id", userId)
            .single();

        const pdfBuffer = await generateAuditPdf({
            chamber_id: user.chamber_id,
            user_name: user.full_name || "Authorized Signatory",
        });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=audit-report.pdf"
        );

        res.send(pdfBuffer);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

const anchorHash = async (hash: string) => {
    // Simulate anchoring on blockchain and returning a tx hash
    return "0x" + hash.substring(0, 20) + "ANCHOR";
}
