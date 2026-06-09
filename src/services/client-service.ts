import { supabase } from "@/utils/supabase/supabase-client";

export async function getClients() {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
            ascending: false,
        });

    if (error) throw error;

    return data || [];
}

export async function getClientById(
    id: string
) {
    const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
}

export async function createClient(
    payload: any
) {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const clientPayload = {
        ...payload,
        user_id: user.id,
    };

    const { data, error } = await supabase
        .from("clients")
        .insert(clientPayload)
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function updateClient(
    id: string,
    payload: any
) {
    const { data, error } = await supabase
        .from("clients")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function deleteClient(
    id: string
) {
    const { error } = await supabase
        .from("clients")
        .delete()
        .eq("id", id);

    if (error) throw error;
}