import crypto from "crypto";

const otpStore = new Map();

export const generateOTP = (user_id: string) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore.set(user_id, {
        otp,
        expires: Date.now() + 5 * 60 * 1000,
    });

    console.log("OTP:", otp); // replace with SMS/email

    return otp;
};

export const verifyOTP = (user_id: string, input: string) => {
    const record = otpStore.get(user_id);

    if (!record) return false;
    if (record.expires < Date.now()) return false;

    return record.otp === input;
};