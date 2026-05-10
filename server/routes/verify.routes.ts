import express, { Request, Response } from "express";
import multer from "multer";
import { supabaseAdmin } from "../config/supabase";
import { generateHash } from "../utils/hash.util";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("file"), async (req: Request, res: Response) => {
    try {
        const fileBuffer = req.file?.buffer;

        if (!fileBuffer) {
            return res.status(400).json({ message: "File is required" });
        }

        const computedHash = generateHash(fileBuffer);

        const { data } = await supabaseAdmin
            .from("audit_logs")
            .select("*")
            .eq("hash", computedHash)
            .single();

        if (!data) {
            return res.json({
                status: "TAMPERED / NOT FOUND",
                computedHash,
            });
        }

        return res.json({
            status: "VALID DOCUMENT",
            signedBy: data.user_name,
            createdAt: data.created_at,
            hash: computedHash,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const hash = Array.isArray(req.query.hash) ? req.query.hash[0] : req.query.hash;

        if (!hash || typeof hash !== "string") {
            return res.status(400).json({ message: "hash query parameter is required" });
        }

        const { data } = await supabaseAdmin
            .from("audit_logs")
            .select("*")
            .eq("hash", hash)
            .single();

        if (!data) {
            return res.status(404).json({
                status: "INVALID / TAMPERED",
            });
        }

        return res.json({
            status: "VALID",
            signedBy: data.user_name,
            hash: data.hash,
            createdAt: data.created_at,
            txHash: data.tx_hash,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
});

export default router;
