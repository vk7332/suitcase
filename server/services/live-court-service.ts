import { openai } from "../config/openai";

export const liveCourtAssist = async (lastLine: string) => {
    const prompt = `
You are a silent co-counsel in a live Indian courtroom.

Lawyer just said:
"${lastLine}"

Give ONLY:
1. Next best sentence (short)
2. Optional case reference (very short)

Strict rules:
- Max 20 words
- No explanation
- Courtroom tone

Return JSON:
{
  "whisper": "...",
  "case": "..."
}
`;

    const res = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
    });

    try {
        return JSON.parse(res.choices[0].message.content || "{}");
    } catch {
        return { whisper: res.choices[0].message.content };
    }
};