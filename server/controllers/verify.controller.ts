import { supabase, supabaseAdmin } from "../config/supabase";
import { Request, Response } from 'express';
import fs from "fs";
import crypto from "crypto";
import { parseCertificate } from "../utils/certificate.util";
import { getMemory } from "../services/memory.service";

const publicKeyPath = "keys/public.pem";
const publicKey = fs.existsSync(publicKeyPath)
    ? fs.readFileSync(publicKeyPath, "utf8")
    : null;

export const verifySignature = (hash: string, signature: string) => {
    if (!publicKey) {
        const fallback = crypto
            .createHmac("sha256", process.env.SIGNATURE_SECRET || "super-secret-key")
            .update(hash)
            .digest("hex");

        return fallback === signature;
    }

    const verifier = crypto.createVerify("RSA-SHA256");
    verifier.update(hash);
    verifier.end();

    return verifier.verify(publicKey, signature, "base64");
};

export const verifyAudit = async (req: Request, res: Response) => {
    const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = rawId || "";

    const chamber_id = id.split("-")[0];

    const { data: logs, error } = await supabase
  .from("audit_logs")
  .select("*")
  .order("created_at", { ascending: true });

if (error || !logs || logs.length === 0) {
  return res.status(404).json({
    success: false,
    error: "No audit logs found",
    details: error?.message,
  });
}

for (let i = 1; i < logs.length; i++) {
  if (logs[i].prev_hash !== logs[i - 1].hash) {
    return res.status(400).json({
      success: false,
      valid: false,
      message: "Audit chain tampered",
    });
  }
}

return res.json({
  success: true,
  valid: true,
  message: "Audit chain is intact",
});
};

export const verifyDocumentAccess = async (req: Request, res: Response) => {
    try {
        const { document_id } = req.params;
        const { data } = await supabase
            .from("document_access_logs")
            .select("*")
            .eq("document_id", document_id)
            .order("created_at", { ascending: true });

        res.json({
            document_id,
            total_events: data?.length || 0,
            logs: data || [],
        });

    } catch (err: any) {
        res.status(500).json({ error: "Failed to fetch document access logs" });
    }
};

export const verifyUserCertificate = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { certificate } = req.body;
        const { data: user, error } = await supabaseAdmin
            .from("users")
            .select("chamber_id, full_name")
            .eq("id", userId)
            .single();

        if (error || !user) {
            return res.status(404).json({ error: "User not found" });
        }

        const certInfo = parseCertificate(certificate);
        const chamber_id = user.chamber_id;
        
        // For demo, we just check if the certificate's subject common name contains the chamber_id
        if (certInfo.subjectCN && certInfo.subjectCN.includes(chamber_id)) {
            return res.json({ valid: true, user: { id: userId, name: user.full_name } });
        } else {
            return res.json({ valid: false, message: "Certificate does not match user's chamber" });
        }

    } catch (err: any) {
        res.status(500).json({ valid: false, error: "Certificate verification failed" });
    }
};

export const verifyCoCounselAudit = async (req: Request, res: Response) => {
    try {
        const { text, caseId, document_id } = req.body;
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
            total_events: data?.length || 0,
        });
        
    } catch (err: any) {
        res.status(500).json({ valid: false, error: "Co-counsel audit verification failed" });
    }
};

export const finalizeAuditVerification = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const { hash, signature, certificate } = req.body;      
        const { data: user } = await supabaseAdmin
            .from("users")
            .select("chamber_id, full_name")
            .eq("id", userId)
            .single();

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const certInfo = parseCertificate(certificate);
        const chamber_id = user.chamber_id;
        const pdf = await generateAuditPDF(user.chamber_id);

        // For demo, we just check if the certificate's subject common name contains the chamber_id
        if (certInfo.subjectCN && certInfo.subjectCN.includes(chamber_id)) {
            return res.json({ valid: true, user: { id: userId, name: user.full_name }, pdf });
        } else {
            return res.json({ valid: false, message: "Certificate does not match user's chamber" });
        }

    } catch (err: any) {
        res.status(500).json({ valid: false, error: "Final audit verification failed" });
    }
};

const generateAuditPDF = async (chamber_id: string) => {
    // Placeholder function to generate a PDF report of the audit
    // In a real implementation, you'd use a library like pdfkit or puppeteer to create a PDF
    return `PDF report for chamber ${chamber_id} generated at ${new Date().toISOString()}`;
};

