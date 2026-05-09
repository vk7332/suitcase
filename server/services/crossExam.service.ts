import { openai } from "../config/openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export const generateCrossExam = async (
    opponentLines: string[]
) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `
Generate sharp cross-examination questions based on opponent statements.

Focus on:
- contradictions
- vague claims
- missing proof

Return JSON:
{
  questions: []
}
        `,
            },
            {
                role: "user",
                content: opponentLines.join("\n"),
            },
        ],
    });

    try {
        return JSON.parse(
            completion.choices[0].message.content!
        );
    } catch {
        return { questions: [] };
    }
};

export const generateCrossExamChain = async (
    statement: string,
    facts: string
) => {
    const prompt = `
You are a trial lawyer.

Opponent said:
"${statement}"

Case facts:
${facts}

Generate a 3-step cross-examination chain:

Q1 → simple factual
Q2 → narrowing / confirming
Q3 → trap question (forces contradiction/admission)

Rules:
✔ Each question max 12 words
✔ Courtroom style
✔ No explanation

Return JSON:
{
  "q1": "...",
  "q2": "...",
  "q3": "..."
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
        return {
            q1: "Do you have any document supporting this claim?",
            q2: "Was this document filed with your pleadings?",
            q3: "Can you show it on record today?",
        };
    }
};