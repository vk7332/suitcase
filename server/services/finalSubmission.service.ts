import { openai } from "../config/openai";

export const generateFinalSubmission = async (transcript: string) => {
    const prompt = `
You are a senior Indian advocate.

Convert the hearing transcript into FINAL WRITTEN SUBMISSIONS.

Transcript:
${transcript}

Include:
1. Title (Court format)
2. Facts
3. Issues
4. Arguments (numbered)
5. Case Laws (Indian judgments with principle)
6. Prayer

Format properly for court filing.
`;

    const res = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
    });

    return res.choices[0].message.content;
};