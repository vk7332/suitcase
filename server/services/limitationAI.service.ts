import { openai } from "../config/openai";

export const detectLimitationFromFacts = async (facts: string) => {
    const prompt = `
You are a legal assistant trained in Indian law.

From the case facts below, extract:

1. Cause of action date
2. Case type (civil / appeal / consumer / cheque bounce / etc.)
3. Suggested limitation period (in days)
4. Confidence (0–1)
5. Notes (if unclear)

Facts:
${facts}

Return JSON:
{
  "cause_date": "YYYY-MM-DD",
  "case_type": "...",
  "limitation_days": number,
  "confidence": number,
  "notes": "..."
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
        return { error: "Parsing failed" };
    }
};

export const detectLimitationFromDocuments = async (documents: string[]) => {
    const prompt = `
You are a legal assistant trained in Indian law.
From the following document excerpts, extract any mentioned limitation periods:

${documents.map((doc, i) => `Document ${i + 1}:\n${doc}`).join("\n\n")}
Return a list of findings in JSON:
[
  {
    "document_index": number,
    "case_type": "...",
    "limitation_days": number,
    "context": "..."
  }
]
`;

    const res = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
    });

    export const calculateFromAI = (aiData: any) => {
        if (!aiData.cause_date || !aiData.limitation_days) {
            return null;
        }

        const base = new Date(aiData.cause_date);
        const deadline = new Date(
            base.getTime() + aiData.limitation_days * 86400000
        );

        return {
            deadline,
            daysLeft: Math.ceil(
                (deadline.getTime() - Date.now()) / 86400000
            ),
        };
    };

    import { openai } from "../config/openai";

    export const detectMultipleTriggers = async (facts: string) => {
        const prompt = `
Extract ALL possible limitation trigger dates from facts.

Facts:
${facts}

Return JSON:
{
  "triggers": [
    {
      "type": "cause_of_action | notice | knowledge | acknowledgment",
      "date": "YYYY-MM-DD",
      "confidence": 0-1
    }
  ],
  "suggested_primary": "type",
  "case_type": "...",
  "limitation_days": number
}
`;

        const res = await openai.chat.completions.create({
            model: "gpt-5-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
        });

        return JSON.parse(res.choices[0].message.content || "{}");
    };

    try {

        // logic

        return {
            success: true
        };

    } catch (err) {

        console.error(err);

        return {
            success: false
        };

    }

};