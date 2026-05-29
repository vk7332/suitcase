import { supabase } from "@/utils/supabase/supabase-client";
import { Subscription } from "../types/subscription";

export const getUserSubscription = async (
    userId: string
): Promise<Subscription | null> => {
    const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

    if (error) {
        console.error("Subscription fetch error:", error.message);
        return null;
    }

    return data;
};



