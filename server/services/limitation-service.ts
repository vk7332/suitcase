import { openai } from "../config/openai.js";

export const calculateLimitation = (
    causeDate: string,
    type: string
) => {
    const base = new Date(causeDate);

    let days = 0;

    switch (type) {
        case "civil":
            days = 90;
            break;
        case "appeal":
            days = 30;
            break;
        case "consumer":
            days = 45;
            break;
        default:
            days = 60;
    }

    const deadline = new Date(base.getTime() + days * 86400000);

    return {
        deadline,
        daysLeft: Math.ceil(
            (deadline.getTime() - Date.now()) / 86400000
        ),
    };
};

export const detectLimitation = async (facts: string) => {
    const prompt = `
Extract the most likely limitation trigger date and case type from the following facts.
Facts:
${facts}
Return JSON:
{
    "cause_date": "YYYY-MM-DD",
    "case_type": "...",
    "limitation_days": number,
    "confidence": 0-1,
    "notes": "any additional notes or uncertainties"
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

export const evaluateTriggers = (triggers: any[], days: number) => {
    return triggers.map((t) => {
        const base = new Date(t.date);
        const deadline = new Date(
            base.getTime() + days * 86400000
        );

        return {
            ...t,
            deadline,
            daysLeft: Math.ceil(
                (deadline.getTime() - Date.now()) / 86400000
            ),
        };
    });
};