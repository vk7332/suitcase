import { supabase } from "@/utils/supabase/supabase-client";

export async function getClients() {
    const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) console.log(error);
    return data;
}

export async function addClient(client: any) {
    const { error } = await supabase
        .from("clients")
        .insert([client]);

    if (error) console.log(error);
}

export async function updateClient(id: string, client: any) {
    const { error } = await supabase
        .from("clients")
        .update(client)
        .eq("id", id);

    if (error) console.log(error);
}

export async function deleteClient(id: string) {
    const { error } = await supabase
        .from("clients")
        .delete()
        .eq("id", id);

    if (error) console.log(error);
}


