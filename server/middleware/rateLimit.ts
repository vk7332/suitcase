import rateLimit from "express-rate-limit";

export const aiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: "Too many AI requests. Please try again later.",
});