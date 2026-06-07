import { supabase } from "@/utils/supabase/supabase-client";
import { CreateCasePayload } from "@/types/case";

export async function createCase(payload: CreateCasePayload) {
const {
data: { user }
} = await supabase.auth.getUser();

if (!user) {
    throw new Error("User not authenticated");
}

const { data, error } = await supabase
    .from("cases")
    .insert([
        {
            case_title: payload.case_title,
            case_number: payload.case_number || null,
            court_name: payload.court_name || null,
            status: payload.status || "active",
            created_by: user.id
        }
    ])
    .select()
    .single();

if (error) {
    throw error;
}

return data;
}

export async function getCases() {
const {
data: { user }
} = await supabase.auth.getUser();

if (!user) {
    throw new Error("User not authenticated");
}

const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("created_by", user.id)
    .order("created_at", {
        ascending: false
    });

if (error) {
    throw error;
}

return data;
}

export async function getCaseById(id: string) {
const { data, error } = await supabase
.from("cases")
.select("*")
.eq("id", id)
.single();

if (error) {
    throw error;
}

return data;
}

export async function updateCase(id: string, updates: any) {
const { data, error } = await supabase
.from("cases")
.update(updates)
.eq("id", id)
.select()
.single();

if (error) {
    throw error;
}

return data;
}

export async function deleteCase(id: string) {
const { error } = await supabase
.from("cases")
.delete()
.eq("id", id);

if (error) {
    throw error;
}

return true;

}