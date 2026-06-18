import { supabase } from "../config/supabase.js";
import { Request, Response } from 'express';
import { v4 as uuidv4 } from "uuid";

export const createShareLink = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { document_id } = req.body;

        const token = uuidv4();

        const expires_at = new Date();
        expires_at.setDate(expires_at.getDate() + 7); // 7 days expiry

        const { error } = await supabase.from("shared_links").insert([
            {
                document_id,
                token,
                expires_at,
            },
        ]);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const link = `${process.env.FRONTEND_URL}/client/document/${token}`;

        res.json({ link });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: "failed to create share link" });
    }
};

export const accessSharedDocument = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;

        const { data, error } = await supabase
            .from("shared_links")
            .select("document_id, expires_at")
            .eq("token", token)
            .single();

        if (error || !data) {
            return res.status(404).json({ error: "Shared link not found" });
        }

        const now = new Date();
        const expiresAt = new Date(data.expires_at);

        if (now > expiresAt) {
            return res.status(410).json({ error: "Shared link has expired" });
        }

        // Get the document details
        const { data: document, error: docError } = await supabase
            .from("documents")
            .select("*")
            .eq("id", data.document_id)
            .single();

        if (docError || !document) {
            return res.status(404).json({ error: "Document not found" });
        }

        res.json({ document });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: "Failed to access shared document" });
    }
};