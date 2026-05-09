import { openai } from "../config/openai";

export const simulateJudge = async (
    facts: string,
    argumentsText: string
) => {
    const prompt = `
You are a strict Indian judge conducting a live court hearing.

Case facts:
${facts}

Lawyer's arguments:
${argumentsText}

Simulate a courtroom interaction.

Provide:
1. Judge questions (challenging)
2. Interruptions
3. Opponent objections
4. Best responses for lawyer
5. Final judge observation

Return JSON:
{
  "questions": ["..."],
  "interruptions": ["..."],
  "objections": ["..."],
  "best_responses": ["..."],
  "judge_observation": "..."
}
`;

    const res = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
    });

    try {
        return JSON.parse(res.choices[0].message.content || "{}");
    } catch {
        return { raw: res.choices[0].message.content };
    }
};