import { supabase } from "../config/supabase";
import { Request, Response } from 'express';
import { logDocumentAccess } from "../utils/auditLogger";

export const getSharedDocument = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;

        const { data: link } = await supabase
            .from("shared_links")
            .select("*")
            .eq("token", token)
            .single();

        await logDocumentAccess({
            document_id: document.id,
            user_id: null, // client (anonymous)
            organization_id: document.organization_id,
            access_type: "client_view",
            req,
        });

        if (!link) {
            return res.status(404).json({ error: "Invalid link" });
        }

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

        res.json(document);
    } catch (err: any) {
        res.status(500).json({ error: "failed to fetch document" });
    }
};