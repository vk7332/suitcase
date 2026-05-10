import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.string(),

  PORT: z.string(),

  OPENAI_API_KEY: z.string(),

  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),

  JWT_SECRET: z.string(),

  REDIS_URL: z.string(),

  RAZORPAY_KEY_ID: z.string(),
  RAZORPAY_KEY_SECRET: z.string(),

  TWILIO_ACCOUNT_SID: z.string(),
  TWILIO_AUTH_TOKEN: z.string(),
});

export const env = envSchema.parse(process.env);
