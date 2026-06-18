import { openai } from "../config/openai.js";
import { retrieveJudgments } from "./rag-service.js";
import { searchJudgments } from "./vector-search-service.js";

export const aiLegalResearch = async (query: string) => {
    const matches = await searchJudgments(query);

    const context = matches
        .map((m: any) => `${m.title}: ${m.content}`)
        .join("\n\n");

    const prompt = `
You are a senior Indian lawyer.

Use the following case laws:
${context}

Answer:
${query}

Provide:
- Clear answer
- Legal reasoning
- Case laws used
- Confidence
`;

    const res = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
    });

    return res.choices[0].message.content;
};