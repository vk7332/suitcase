import { v4 as uuidv4 } from "uuid";
import { supabase } from "../config/supabase";

export const createShareLink = async (req, res) => {
    try {
        const { documentId, caseId, email } = req.body;

        const token = uuidv4();

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 3); // 3 days

        await supabase.from("shared_documents").insert([
            {
                document_id: documentId,
                case_id: caseId,
                shared_with: email,
                token,
                expires_at: expiresAt,
            },
        ]);

        const link = `${process.env.FRONTEND_URL}/shared/${token}`;

        res.json({ link });
    } catch (err) {
        res.status(500).json({ error: "failed to create link" });
    }
};