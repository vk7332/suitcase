import { supabaseAdmin } from "../config/supabase";
import { Request, Response } from 'express';
import fs from "fs";
import crypto from "crypto";

const publicKey = fs.readFileSync("keys/public.pem", "utf8");

export const verifySignature = (hash: string, signature: string) => {
    const verifier = crypto.createVerify("RSA-SHA256");
    verifier.update(hash);
    verifier.end();

    return verifier.verify(publicKey, signature, "base64");
};

export const verifyAudit = async (req: Request, res: Response) => {
    const { id } = req.params;

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