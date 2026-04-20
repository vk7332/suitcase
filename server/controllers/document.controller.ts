import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import { logAction } from "../services/audit.service";

// 📤 UPLOAD DOCUMENT
export const uploadDocument = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { caseId } = req.body;
        const file = (req as any).file;

        if (!file) {
            return res.status(400).json({ error: "file required" });
        }

        const filePath = `${caseId}/${Date.now()}-${file.originalname}`;

        // upload to supabase storage
        const { error: uploadError } = await supabase.storage
            .from("documents")
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
            });

        if (uploadError) {
            return res.status(500).json({ error: uploadError.message });
        }

        // save metadata
        const { data, error } = await supabase
            .from("documents")
            .insert([
                {
                    case_id: caseId,
                    uploaded_by: userId,
                    file_name: file.originalname,
                    file_path: filePath,
                },
            ])
            .select()
            .single();

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        // 🔔 AUDIT LOG
        await logAction({
            userId,
            caseId,
            action: "DOCUMENT_UPLOADED",
            metadata: { fileName: file.originalname },
        });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "upload failed" });
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
    } catch (err) {
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
    } catch (err) {
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

        // 🔔 AUDIT LOG
        await logAction({
            userId,
            caseId: doc.case_id,
            action: "DOCUMENT_DELETED",
            metadata: { fileName: doc.file_name },
        });

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "delete failed" });
    }
};