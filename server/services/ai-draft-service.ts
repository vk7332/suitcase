import { openai } from "../config/openai.js";

export const generateDraftFromQuery = async (
    query: string,
    type: "plaint" | "written_statement" | "reply"
) => {
    const prompt = `
You are a senior advocate drafting a ${type}.

Based on the user query, generate a complete legal draft in Indian court format:

Include:
- Cause Title
- Facts
- Grounds
- Prayer

User Query:
${query}

Make it formal, court-ready and structured.
`;

    const response = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
    });

    return response.choices[0].message.content;
};