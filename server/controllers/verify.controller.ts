import { supabaseAdmin } from "../config/supabase";
import { Request, Response } from 'express';
import fs from "fs";
import crypto from "crypto";

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

    const { data: logs } = await supabaseAdmin
        .from("audit_logs")
        .select("*")
        .eq("chamber_id", chamber_id)
        .order("created_at", { ascending: true });

    let chainValid = true;

    for (let i = 1; i < logs.length; i++) {
        if (logs[i].prev_hash !== logs[i - 1].hash) {
            chainValid = false;
            break;
        }
    }

    // OPTIONAL: verify signature if stored

    res.json({
        chainValid,
        message: chainValid
            ? "Integrity intact"
            : "Tampering detected",
    });
};
