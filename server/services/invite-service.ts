import { v4 as uuidv4 } from "uuid";
import { supabase } from "../config/supabase.js";

export const createInvite = async ({
    email,
    role,
    organizationId,
}: any) => {
    const token = uuidv4();

    const expires = new Date();
    expires.setDate(expires.getDate() + 2);

    const { error } = await supabase.from("invites").insert([
        {
            email,
            role,
            token,
            organization_id: organizationId,
            expires_at: expires,
        },
    ]);

    if (error) throw error;

    return token;
};

export const getInviteByToken = async (token: string) => {
    const { data, error } = await supabase
        .from("invites")
        .select("*")
        .eq("token", token)
        .single();

    if (error) throw error;

    return data;
};