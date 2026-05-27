import { openai } from "../config/openai";

export const generateEmbedding = async (text: string) => {
    const res = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
    });

    return res.data[0].embedding;
};