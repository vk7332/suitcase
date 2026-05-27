import OpenAI from "openai";
import { fetchCitations } from "./citation-service.ts";

interface Citation {
    title: string;
    court: string;
    principle: string;
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export const generateWrittenArguments = async (notes: string[]) => {
    const query = notes.join(" ");
    const citations = await fetchCitations(query);
    const citationText = !citations.length
        ? "No verified case laws available. Proceed without citations."
        : citations
            .map(
                (c: Citation, i: number) =>
                    `${i + 1}. ${c.title} (${c.court}) - ${c.principle}`
            )
            .join("\n");

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `
You are a legal assistant.

Use ONLY the provided case laws. Do NOT create new ones.

Format:
1. Introduction
2. Facts
3. Issues
4. Arguments (with citations)
5. Prayer
        `,
            },
            {
                role: "user",
                content: `
Notes:
${notes.join("\n")}

Case Laws:
${citationText}
        `,
            },
        ],
    });

    return completion.choices[0].message.content;
};
