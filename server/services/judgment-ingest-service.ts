import { supabase } from "../config/supabase";
import { generateEmbedding } from "./embedding-service.ts";

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