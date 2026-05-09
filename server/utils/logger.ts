export const logger = {
    info: (msg: string, data?: any) => {
        console.log(`[INFO] ${msg}`, data || "");
    },

    error: (msg: string, err?: any) => {
        console.error(`[ERROR] ${msg}`, err || "");
    },

    warn: (msg: string, data?: any) => {
        console.warn(`[WARN] ${msg}`, data || "");
    },
};