import crypto from "crypto";
import fs from "fs";

const privateKey = fs.readFileSync("keys/private.pem", "utf8");

export const signHash = (hash: string) => {
    const signer = crypto.createSign("RSA-SHA256");
    signer.update(hash);
    signer.end();

    return signer.sign(privateKey, "base64");
};

const SECRET = process.env.SIGNATURE_SECRET || "super-secret-key";

export const generateSignature = (data: any) => {
    return crypto
        .createHmac("sha256", SECRET)
        .update(JSON.stringify(data))
        .digest("hex");
};