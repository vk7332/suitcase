import { supabase } from "../config/supabase";
import { Request, Response } from 'express';

export const createOrganization = async (req: Request, res: Response) => {
    const { name } = req.body;
    const user = req.user;

    const { data, error } = await supabase
        .from("organizations")
        .insert([
            {
                name,
                owner_id: user.id,
            },
        ])
        .select()
        .single();

    if (error) return res.status(500).json({ error });

    // update user profile
    await supabase
        .from("profiles")
        .update({
            organization_id: data.id,
            role: "admin",
        })
        .eq("id", user.id);

    res.json(data);
};