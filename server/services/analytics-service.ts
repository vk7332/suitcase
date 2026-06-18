import { openai } from "../config/openai.js";

export const analyzeCase = async (facts: string) => {
    const prompt = `
You are a legal analytics engine.

Case facts:
${facts}

Evaluate:

1. Strength score (0–100)
2. Win probability (%)
3. Key strengths
4. Key weaknesses
5. Missing evidence
6. Judge sensitivity factors

Return JSON:
{
  "score": number,
  "probability": number,
  "strengths": ["..."],
  "weaknesses": ["..."],
  "missing": ["..."],
  "judge_factors": ["..."]
}
`;

    const res = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
    });

    return JSON.parse(res.choices[0].message.content || "{}");
};

// inside analytics.service.ts

export const judgePattern = async (facts: string) => {
    const prompt = `
Based on case facts:

${facts}

Predict judge behavior:

1. Strict or lenient
2. Focus area (evidence / law / procedure)
3. What irritates judge
4. What impresses judge

Return JSON:
{
  "style": "...",
  "focus": "...",
  "irritants": ["..."],
  "preferences": ["..."]
}
`;

    const res = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
    });

    return JSON.parse(res.choices[0].message.content || "{}");
};