import dotenv from "dotenv";
dotenv.config();

export const ENV = {
    SMTP_EMAIL: process.env.SMTP_EMAIL!,
    SMTP_PASS: process.env.SMTP_PASS!,
    TWILIO_SID: process.env.TWILIO_SID!,
    TWILIO_AUTH: process.env.TWILIO_AUTH!,
    TWILIO_PHONE: process.env.TWILIO_PHONE!,
};