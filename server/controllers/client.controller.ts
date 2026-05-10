import { supabase } from "../config/supabase";
import { Request, Response } from 'express';
import { createAuditLog } from "../utils/auditLogger";

export const getSharedDocument = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;

        const { data: link } = await supabase
            .from("shared_links")
            .select("*")
            .eq("token", token)
            .single();

        if (!link) {
            return res.status(404).json({ error: "Invalid link" });
        }

        const { data: document } = await supabase
            .from("documents")
            .select("*")
            .eq("id", link.document_id)
            .single();

        if (!document) {
            return res.status(404).json({ error: "Document not found" });
        }

        await createAuditLog({
            action: "client_view",
            user_id: "anonymous",
            chamber_id: document.chamber_id || "public",
            metadata: {
                document_id: document.id,
                organization_id: document.organization_id,
                ip: req.ip,
                token,
            },
        });

        // ⏳ check expiry
        if (new Date(link.expires_at) < new Date()) {
            return res.status(403).json({ error: "Link expired" });
        }

        const filePath = document.file_url.split("/documents/")[1];

        const { data } = await supabase.storage
            .from("documents")
            .createSignedUrl(filePath, 120); // 2 min

        res.json({
            url: data.signedUrl,
        });
    } catch (err: any) {
        res.status(500).json({ error: "failed to fetch document" });
    }
};
