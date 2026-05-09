import { searchJudgments } from "./vectorSearch.service";
import { openai } from "../config/openai";

export const multiDocLegalReasoning = async (query: string) => {
    // 🔍 Step 1: Retrieve top 5 relevant judgments
    const matches = await searchJudgments(query);

    // 🧠 Step 2: Build structured context
    const structuredCases = matches.map((m: any, i: number) => ({
        id: i + 1,
        title: m.title,
        content: m.content.slice(0, 1000), // limit size
    }));

    const contextText = structuredCases
        .map(
            (c) => `Case ${c.id}: ${c.title}\n${c.content}`
        )
        .join("\n\n");

    // 🤖 Step 3: Ask LLM to synthesize
    const prompt = `
You are a senior Indian advocate.

Given the following judgments:

${contextText}

Answer the legal question:
${query}

Perform:
1. Extract principle from each case
2. Compare and reconcile them
3. Apply to the query
4. Give final conclusion

Return JSON:

{
  "answer": "...",
  "combined_reasoning": ["..."],
  "cases_used": ["Case 1", "Case 2"],
  "conflicts": ["if any contradictions"],
  "final_position": "...",
  "confidence": 0-100
}
`;

    const res = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
    });

    const text = res.choices[0].message.content || "{}";

    try {
        return JSON.parse(text);
    } catch {
        return { raw: text };
    }
};