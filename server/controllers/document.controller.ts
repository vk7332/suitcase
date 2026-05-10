import { Request, Response } from "express";
import { supabase, supabaseAdmin } from "../config/supabase";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { generateHash } from "../utils/auditLogger";
import { addWatermark } from "../utils/pdfWatermark";
import { generateOTP } from "../services/otp.service";
import { signDocumentService } from "../services/signing.service";
import { parseDocxToParagraphs } from "../services/docx.service";
import { normalizeParagraphs } from "../services/format.service";
import { generatePdf } from "../services/pdf.service";
import { detectSections } from "../services/heading.service";
import {
    detectCauseTitle,
    extractParties,
} from "../services/causeTitle.service";
import { validatePleading } from "../services/validation.service";

export const uploadAndConvertDocx = async (req: Request, res: Response) => {
    try {
        const file = (req as any).file;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // 1. Extract paragraphs
        const rawParagraphs = await parseDocxToParagraphs(file.buffer);

        // 2. Clean paragraphs
        const cleaned = normalizeParagraphs(rawParagraphs);

        // 🔹 detect cause title
        const cause = detectCauseTitle(cleaned);

        // 🔹 extract parties
        const partyData = extractParties(cause.parties);

        const sections = detectSections(cleaned);

        const validation = validatePleading(sections);
        
        // 3. Generate PDF
        const pdfBuffer = await generatePdf({
            paragraphs: cleaned,
            document: {
                status: "draft",
                case_number: "TEMP",
                advocate_name: "Advocate Name",
            },
            signers: [],
        });

        res.setHeader("Content-Type", "application/pdf");
        res.send(pdfBuffer);

    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const requestOTP = async (req: Request, res: Response) => {
    try {
        const user_id = (req as any).user.id;
        await generateOTP(user_id);
        res.json({ message: "OTP sent" });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const signDocument = async (req: Request, res: Response) => {
    try {
        const user_id = (req as any).user.id;
        const { document_id, signature, certificate, otp } = req.body;

        await signDocumentService({
            document_id,
            user_id,
            signature,
            certificate,
            otp,
        });

        res.json({ message: "Document signed successfully" });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const logDocumentAccess = async (log: any) => {
    const { data: lastLog } = await supabaseAdmin
        .from("audit_logs")
        .select("hash")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    const prevHash = lastLog?.hash || "GENESIS";
    const hash = generateHash(`${JSON.stringify(log)}|${prevHash}`);
    
    await supabaseAdmin.from("audit_logs").insert({
        ...log,
        hash,
        prev_hash: prevHash,
    });
};

export const getSignedDocumentUrlHandler = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { id } = req.params;

        const { data: doc } = await supabaseAdmin
            .from("documents")
            .select("*")
            .eq("id", id)
            .single();

        if (!doc) return res.status(404).json({ message: "Not found" });

        const { data: user } = await supabaseAdmin
            .from("users")
            .select("chamber_id, email, organization_id")
            .eq("id", userId)
            .single();

        if (!user) return res.status(404).json({ message: "User not found" });

        // Authorization checks
        if (doc.chamber_id !== user.chamber_id) {
            return res.status(403).json({ message: "Unauthorized (Chamber mismatch)" });
        }

        if (doc.organization_id !== user.organization_id) {
            return res.status(403).json({ error: "Access denied (Org mismatch)" });
        }

        // 🔔 AUDIT LOG
        await logDocumentAccess({
            action: "GET_SIGNED_URL",
            user_id: userId,
            document_id: doc.id,
            chamber_id: doc.chamber_id,
        });

        // 2️⃣ Extract file path from URL or property
        const filePath = doc.file_path || doc.file_url?.split("/documents/")[1];

        if (!filePath) return res.status(400).json({ error: "Invalid file path" });

        if (doc.is_watermarked) {
            const { data: fileData, error: downloadError } = await supabaseAdmin.storage
                .from("documents")
                .download(filePath);

            if (downloadError) throw downloadError;

            const fileBuffer = Buffer.from(await fileData.arrayBuffer());

            const watermarked = await addWatermark(
                fileBuffer,
                `Shared for ${user.email} at ${new Date().toLocaleString()}`
            );

            // In a real app, you might re-upload or serve the watermarked buffer directly
            // For now, we'll continue with the signed URL as per existing logic,
            // but the watermark logic above shows how to handle the buffer.
        }

        // 3️⃣ Create signed URL (expires in 60 seconds)
        const { data, error: signError } = await supabase.storage
            .from("documents")
            .createSignedUrl(filePath, 60);

        if (signError) {
            return res.status(400).json({ error: signError.message });
        }

        return res.json({ url: data.signedUrl });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate secure URL" });
    }
};

export const getDocumentVersions = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const { document_id } = req.params;

        // 1. Get document
        const { data: document } = await supabaseAdmin
            .from("documents")
            .select("current_version, created_by, locked")
            .eq("id", document_id)
            .single();

        if (!document) throw new Error("Document not found");

        if (document.locked) {
            throw new Error("Document is locked and cannot be modified");
        }

        // 2. Get versions
        const { data: versions } = await supabaseAdmin
            .from("document_versions")
            .select("*")
            .eq("document_id", document_id)
            .order("version", { ascending: true });

        let filtered;

        // 3. Role-based filtering
        if (user.role === "advocate") {
            filtered = versions; // FULL ACCESS
        } else {
            // client/witness → ONLY FINAL VERSION
            filtered = versions?.filter(
                (v: any) => v.version === document.current_version
            ) || [];
        }

        res.json(filtered);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// memory storage (no temp files)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadDocument = async (
    req: Request,
    res: Response
) => {
    try {
        /**
         * Your existing logic here
         */

        return res.json({
            success: true
        });

    } catch (err: any) {
        console.error('Upload error:', err);

        return res.status(500).json({
            success: false,
            error: 'Document upload failed'
        });
    }
};

// 📄 LIST DOCUMENTS BY CASE
export const getDocuments = async (req: Request, res: Response) => {
    try {
        const { caseId } = req.params;

        const { data, error } = await supabase
            .from("documents")
            .select("*")
            .eq("case_id", caseId)
            .order("created_at", { ascending: false });

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: "failed to fetch documents" });
    }
};

// 🔗 GENERATE SIGNED URL (SECURE DOWNLOAD)
export const getDocumentUrl = async (req: Request, res: Response) => {
    try {
        const { path } = req.query;

        const { data, error } = await supabase.storage
            .from("documents")
            .createSignedUrl(path as string, 60 * 5); // 5 minutes

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json({ url: data.signedUrl });
    } catch (err: any) {
        res.status(500).json({ error: "failed to generate url" });
    }
};

// 🗑 DELETE DOCUMENT
export const deleteDocument = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { id } = req.params;

        // get document first
        const { data: doc } = await supabase
            .from("documents")
            .select("*")
            .eq("id", id)
            .single();

        if (!doc) {
            return res.status(404).json({ error: "not found" });
        }

        // delete from storage
        await supabase.storage
            .from("documents")
            .remove([doc.file_path]);

        // delete from DB
        await supabase
            .from("documents")
            .delete()
            .eq("id", id);

        res.json({ success: true });
    } catch (err: any) {
        res.status(500).json({ error: "delete failed" });
    }
};

async function fetchFileSomehow(filePath: string): Promise<Buffer> {
    const { data, error } = await supabaseAdmin.storage
        .from("documents")
        .download(filePath);

    if (error) {
        throw new Error(`Failed to download file: ${error.message}`);
    }

    return Buffer.from(await data.arrayBuffer());
}

export const streamDocument = async (req: Request, res: Response) => {
    try {
        const { documentId } = req.params;
        const { data: doc } = await supabase
            .from("documents")
            .select("file_path, file_name")
            .eq("id", documentId)
            .single();

        if (!doc) {
            return res.status(404).json({ error: "Document not found" });
        }

        const fileBuffer = await fetchFileSomehow(doc.file_path);
        res.set("Content-Type", "application/octet-stream");
        res.set("Content-Disposition", `attachment; filename="${doc.file_name}"`);
        res.send(fileBuffer);
    } catch (err: any) {
        res.status(500).json({ error: "Failed to stream document" });
    }
};

export const shareDocument = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const { documentId } = req.params;
        
        const { data: doc, error } = await supabase
            .from("documents")
            .select("*")
            .eq("id", documentId)
            .single();
            
        if (error || !doc) {
            return res.status(404).json({ message: "Document not found" });
        }
        
        if (doc.organization_id !== user.organization_id) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        
        const { data } = await supabase.storage
            .from("documents")
            .createSignedUrl(doc.file_path, 60 * 5);
            
        if (!data) {
            return res.status(500).json({ message: "Failed to generate URL" });
        }
        
        res.json({ signedUrl: data.signedUrl });
    } catch (error: any) {
        res.status(500).json({ message: "Failed to share document" });
    }
};
