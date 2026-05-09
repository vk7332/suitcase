import { openai } from "../config/openai";

export const voiceToDraft = async (speechText: string) => {
    const prompt = `
You are a senior Indian advocate.

Convert the following spoken courtroom argument into a structured written submission.

Speech:
"${speechText}"

Convert into:

1. Heading
2. Facts
3. Arguments (numbered)
4. Legal grounds
5. Prayer

Make it:
✔ Formal
✔ Court-ready
✔ Proper legal English
`;

    const res = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
    });

    return res.choices[0].message.content;
};