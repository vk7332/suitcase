import OpenAI from "openai";
import { fetchCitations } from "./citation.service";

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

const citationDB: Record<string, Citation[]> = {
    contract: [
        {
            title: "Balfour v Balfour",
            court: "Court of Appeal",
            principle:
                "Agreements without intention to create legal relations are not enforceable.",
        },
    ],
    tort: [
        {
            title: "Donoghue v Stevenson",
            court: "House of Lords",
            principle:
                "A person owes a duty of care to their neighbors to avoid acts or omissions that could foreseeably harm them.",
        },
    ],
};

const citations = await fetchCitations(query);

// 🔐 SAFETY LAYER (CRITICAL)
let citationText = "";

if (!citations.length) {
    citationText = "No verified case laws available. Proceed without citations.";
} else {
    citationText = citations
        .map(
            (c, i) =>
                `${i + 1}. ${c.title} (${c.court}) - ${c.principle}`
        )
        .join("\n");
}