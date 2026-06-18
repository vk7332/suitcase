import { openai } from "../config/openai.js";

export const getNextStep = async ({
    facts,
    stage,
    lastAction,
}: {
    facts: string;
    stage: string;
    lastAction?: string;
}) => {
    const prompt = `
You are an Indian litigation strategist.

Case facts:
${facts}

Current stage:
${stage}

Last action taken:
${lastAction || "None"}

Suggest:

1. Next best legal step
2. Reason
3. Risk if not taken
4. Draft action (1–2 lines)

if (stage === "evidence" && !facts.includes("document")) {
  return {
    step: "File application to produce documents",
    reason: "Evidence stage requires documentary proof",
    risk: "Weak case due to lack of evidence",
    draft: "Application under Order 13 CPC...",
  };
}

Return JSON:
{
  "step": "...",
  "reason": "...",
  "risk": "...",
  "draft": "..."
}
`;

    const res = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
    });

    try {
        return JSON.parse(res.choices[0].message.content || "{}");
    } catch {
        return { raw: res.choices[0].message.content };
    }
};