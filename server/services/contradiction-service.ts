import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export const detectContradictions = async (opponentLines: string[]) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `
Identify contradictions within opponent statements.

Return JSON:
{
  contradictions: [
    {
      statement1: "",
      statement2: "",
      issue: ""
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
        return { contradictions: [] };
    }
};

export const detectContradiction = (
    current: string,
    history: string[],
    facts: string
) => {
    const lower = current.toLowerCase();

    // 🔴 simple rule-based detection (fast)
    for (const h of history) {
        if (
            h.toLowerCase().includes("no agreement") &&
            lower.includes("agreement exists")
        ) {
            return "⚠ Opponent contradicts earlier: agreement existence";
        }

        if (
            h.toLowerCase().includes("payment not made") &&
            lower.includes("payment received")
        ) {
            return "⚠ Opponent contradicts on payment";
        }
    }

    // 🔵 fact-based contradiction
    if (
        facts.toLowerCase().includes("no notice served") &&
        lower.includes("notice was served")
    ) {
        return "⚠ Opponent contradicts record: notice issue";
    }

    return null;
};