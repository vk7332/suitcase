import crypto from "crypto";
import fs from "fs";

const privateKeyPath = "keys/private.pem";
const privateKey = fs.existsSync(privateKeyPath)
    ? fs.readFileSync(privateKeyPath, "utf8")
    : null;

export const signHash = (hash: string) => {
    if (!privateKey) {
        return crypto
            .createHmac("sha256", process.env.SIGNATURE_SECRET || "super-secret-key")
            .update(hash)
            .digest("hex");
    }

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
