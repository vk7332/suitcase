import { searchJudgments } from "./vector-search-service.js";
import { openai } from "../config/openai.js";

export const generateCourtArgument = async (query: string) => {
    // 🔍 Step 1: Fetch relevant cases
    const matches = await searchJudgments(query);

    const cases = matches.map((m: any, i: number) => ({
        id: i + 1,
        title: m.title,
        content: m.content.slice(0, 800),
    }));

    const context = cases
        .map(
            (c) => `Case ${c.id}: ${c.title}\n${c.content}`
        )
        .join("\n\n");

    // 🤖 Step 2: Generate argument script
    const prompt = `
You are a senior Indian advocate presenting oral arguments in court.

Using the following judgments:
${context}

Prepare a courtroom oral argument script.

Structure:
1. Opening submission ("May it please the Court...")
2. Facts summary
3. Legal arguments (with case references)
4. Handling opposing arguments
5. Strong conclusion + prayer

Make it:
✔ Persuasive
✔ Formal
✔ Courtroom-ready
✔ Spoken style (not written format)
`;

    const res = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
    });

    return res.choices[0].message.content;
};