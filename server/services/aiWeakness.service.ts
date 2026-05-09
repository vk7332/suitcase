import { openai } from "../config/openai";

export const aiScoreWeakness = async (
    text: string,
    facts: string
) => {
    const prompt = `
You are a courtroom analyst.

Statement:
"${text}"

Case facts:
${facts}

Evaluate strength (0–100).

Rules:
✔ 0 = very weak
✔ 100 = very strong
✔ Consider evidence, consistency, legal validity

Return JSON:
{
  "score": number,
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
        return { score: 50, reason: "Fallback neutral" };
    }
};