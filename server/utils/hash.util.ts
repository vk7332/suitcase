import crypto from "crypto";

export const generateHash = (fileBuffer: Buffer) => {
    return crypto.createHash("sha256").update(fileBuffer).digest("hex");
};