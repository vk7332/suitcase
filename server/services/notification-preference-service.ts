import { supabase } from "../config/supabase.js";

export const getPreferences = async (userId: string) => {
    const { data } = await supabase
        .from("notification_preferences")
        .select("*")
        .eq("user_id", userId)
        .single();

    return data;
};

export const updatePreferences = async (userId: string, prefs: any) => {
    await supabase.from("notification_preferences").upsert({
        user_id: userId,
        ...prefs,
    });
};