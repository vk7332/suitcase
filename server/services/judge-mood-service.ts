import { openai } from "../config/openai.js";

export const aiJudgeMood = async (text: string) => {
    const prompt = `
Judge statement:
"${text}"

Classify mood:
STRICT / IMPATIENT / FAVORABLE / NEUTRAL

Return JSON:
{ "mood": "..." }
`;

    const res = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.1,
    });

    try {
        return JSON.parse(res.choices[0].message.content || "{}");
    } catch {
        return { mood: "NEUTRAL" };
    }
};

export const detectJudgeMood = (text: string) => {
    const lower = text.toLowerCase();

    if (lower.includes("hurry") || lower.includes("quickly")) {
        return "IMPATIENT";
    }
    if (lower.includes("irrelevant") || lower.includes("stick to the point")) {
        return "STRICT";
    }
    if (lower.includes("proceed") || lower.includes("noted")) {
        return "FAVORABLE";
    }

    return "NEUTRAL";
};
