import { openai } from "../config/openai";

export const liveAssistant = async (
    currentArgument: string,
    caseContext: string
) => {
    const prompt = `
You are a courtroom assistant helping a lawyer in real-time.

Current argument:
"${currentArgument}"

Case context:
${caseContext}

Provide:
1. Next best sentence to say
2. Relevant case law (if any)
3. Possible judge question
4. Suggested response to judge
5. Weakness warning (if any)

Return JSON:
{
  "next_line": "...",
  "case_law": "...",
  "judge_question": "...",
  "judge_response": "...",
  "risk": "..."
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
        return { raw: res.choices[0].message.content };
    }
};