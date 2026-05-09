import dotenv from "dotenv";
dotenv.config();

const required = [
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "RAZORPAY_KEY_ID",
    "RAZORPAY_KEY_SECRET",
    "TWILIO_SID",
    "SMTP_EMAIL",
    "SMTP_PASS",
    "TWILIO_AUTH",
    "TWILIO_PHONE",
];

required.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`${key} missing in env`);
    }
});

export const ENV = {
    SUPABASE_URL: "https://rdjanryepgxwsojxfixp.supabase.co",
    SUPABASE_SERVICE_ROLE_KEY: "eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlbHFyb2ViemJkZnVicndndGZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjA5NzQxNiwiZXhwIjoyMDkxNjczNDE2fQ.DvUtG77q7DxLytHUWIWT_t16KrQUrB2XCGNnrZDxoIg",
    SMTP_EMAIL: process.env.SMTP_EMAIL!,
    SMTP_PASS: process.env.SMTP_PASS!,
    TWILIO_SID: process.env.TWILIO_SID!,
    TWILIO_AUTH: process.env.TWILIO_AUTH!,
    TWILIO_PHONE: process.env.TWILIO_PHONE!,
};