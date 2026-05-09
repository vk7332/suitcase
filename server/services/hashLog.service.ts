import crypto from "crypto";

export const generateHash = (data: any): string => {
    return crypto
        .createHash("sha256")
        .update(JSON.stringify(data))
        .digest("hex");
};

export const attachHashToLog = (log: any) => {
    const hash = generateHash(log);

    return {
        ...log,
        hash,
        timestamp: new Date().toISOString(),
    };
};