import { openai } from "../config/openai.js";

export const generateFollowUp = async (
    statement: string,
    objection: string,
    facts: string
) => {
    const prompt = `
You are a courtroom lawyer.

Opponent statement:
"${statement}"

Objection raised:
"${objection}"

Case facts:
${facts}

Generate ONE follow-up question.

Rules:
✔ Max 12 words
✔ Courtroom style
✔ Force clarity or proof
✔ No explanation

Return JSON:
{ "question": "..." }
`;

    const res = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
    });

    try {
        return JSON.parse(res.choices[0].message.content || "{}").question;
    } catch {
        return "Can you substantiate this claim with record?";
    }
};