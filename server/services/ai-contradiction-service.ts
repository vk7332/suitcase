import { openai } from "../config/openai.js";

export const aiCheckContradiction = async (
    current: string,
    history: string[],
    facts: string
) => {
    const prompt = `
You are a legal assistant.

CASE FACTS:
${facts}

OPPONENT PREVIOUS STATEMENTS:
${history.join("\n")}

CURRENT STATEMENT:
"${current}"

Detect if contradiction exists.

If yes:
Return VERY SHORT alert (max 10 words)

If no:
Return "NO"

JSON:
{ "alert": "..." }
`;

    const res = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.1,
    });

    try {
        const parsed = JSON.parse(
            res.choices[0].message.content || "{}"
        );

        return parsed.alert === "NO" ? null : parsed.alert;
    } catch {
        return null;
    }
};