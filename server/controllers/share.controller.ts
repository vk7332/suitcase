import { supabase } from "../config/supabase";
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