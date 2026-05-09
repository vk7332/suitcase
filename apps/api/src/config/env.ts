import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.OPENAI_API_KEY);

function requireEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(
            `❌ Missing required env variable: ${name}`
        );
    }

    return value;
}

export const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',

    PORT: Number(process.env.PORT || 4000),

    SUPABASE_URL: requireEnv('SUPABASE_URL'),

    SUPABASE_SERVICE_ROLE_KEY: requireEnv(
        'SUPABASE_SERVICE_ROLE_KEY'
    ),

    OPENAI_API_KEY: requireEnv('OPENAI_API_KEY'),

    REDIS_URL: requireEnv('REDIS_URL'),

    RAZORPAY_KEY_ID: requireEnv('RAZORPAY_KEY_ID'),

    RAZORPAY_KEY_SECRET: requireEnv(
        'RAZORPAY_KEY_SECRET'
    ),

    JWT_SECRET: requireEnv('JWT_SECRET')
};