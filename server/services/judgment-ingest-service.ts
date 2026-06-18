import { supabase } from "../config/supabase.js";
import { generateEmbedding } from "./embedding-service.js";

export const ingestJudgment = async (
    title: string,
    content: string
) => {
    const embedding = await generateEmbedding(content);

    const { error } = await supabase.from("judgments").insert([
        {
            title,
            content,
            embedding,
        },
    ]);

    if (error) throw error;
};