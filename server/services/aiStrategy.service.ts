import { openai } from "../config/openai";

export const aiDecideStrategy = async (
    text: string,
    facts: string
) => {
    const prompt = `
You are a courtroom strategist.

Opponent statement:
"${text}"

Case facts:
${facts}

Choose ONE:
ARGUE / CROSS / OBJECT / SILENT

Rules:
✔ Prefer silence if no clear advantage
✔ Be conservative

Return JSON:
{
  "action": "...",
  "reason": "..."
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
        return { action: "SILENT", reason: "Fallback safe mode" };
    }
};