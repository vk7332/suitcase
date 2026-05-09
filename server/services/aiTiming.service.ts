import { openai } from "../config/openai";

export const aiDecideTiming = async (
    text: string,
    strategy: string
) => {
    const prompt = `
You are a courtroom strategist.

Statement:
"${text}"

Strategy:
${strategy}

Decide:
INTERRUPT_NOW / WAIT / DO_NOT_INTERRUPT

Rules:
✔ Prefer WAIT over interrupt
✔ Interrupt only if strong legal reason

Return JSON:
{
  "decision": "...",
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
        return { decision: "WAIT", reason: "Fallback safe" };
    }
};