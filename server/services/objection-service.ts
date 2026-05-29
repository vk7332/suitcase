import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export const generateObjections = async (
    opponentLines: string[]
) => {
    if (!opponentLines || opponentLines.length === 0) {
        return { objections: [] };
    }

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `
You are a courtroom assistant.

From opponent statements, generate valid legal objections.

Use common grounds:
- hearsay
- irrelevant
- leading
- no evidence
- argumentative
- speculation

Return JSON:
{
  objections: [
    {
      line: "",
      objection: "",
      reason: ""
    }
  ]
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
        return { objections: [] };
    }
};