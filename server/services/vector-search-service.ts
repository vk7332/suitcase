import { supabase } from "../config/supabase.js";
import { generateEmbedding } from "./embedding-service.js";

export const searchJudgments = async (query: string) => {
    const embedding = await generateEmbedding(query);

    const { data, error } = await supabase.rpc("match_judgments", {
        query_embedding: embedding,
        match_count: 5,
    });

    if (error) throw error;

    return data;
};