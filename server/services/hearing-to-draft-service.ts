import { openai } from "../config/openai.js";

export const hearingToDraft = async (transcript: string) => {
    const prompt = `
Convert this courtroom hearing transcript into structured written arguments.

Transcript:
${transcript}

Output format:
1. Introduction
2. Facts
3. Arguments (numbered)
4. Legal position
5. Prayer

Formal legal style.
`;

    const res = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
    });

    return res.choices[0].message.content;
};