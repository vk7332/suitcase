import { openai } from "../config/openai";

export const aiWinProbability = async (
    facts: string,
    recent: string[]
) => {
    const prompt = `
You are a legal analyst.

Case facts:
${facts}

Recent hearing:
${recent.join("\n")}

Estimate win probability (0–100).

Be conservative.

Return JSON:
{
  "probability": number,
  "reason": "short reason"
}
`;

    const res = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.1,
    });

    try {
        return JSON.parse(res.choices[0].message.content || "{}");
    } catch {
        return { probability: 50, reason: "Neutral fallback" };
    }
};