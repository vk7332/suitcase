import { supabase } from "../config/supabase";
import { Request, Response } from 'express';
import { v4 as uuidv4 } from "uuid";

export const createInvite = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        const { email, role } = req.body;

        const token = uuidv4();

        const { error } = await supabase.from("invites").insert([
            {
                email,
                role,
                organization_id: user.organization_id,
                token,
            },
        ]);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // 👉 link to send to user
        const inviteLink = `${process.env.FRONTEND_URL}/accept-invite?token=${token}`;

        return res.json({ link: inviteLink });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: "failed to create invite" });
    }
};

export const acceptInvite = async (req: Request, res: Response) => {
    const { token } = req.body;
    const user = req.user;

    const { data } = await supabase
        .from("invites")
        .select("*")
        .eq("token", token)
        .single();

    if (!data) return res.status(404).json({ error: "invalid" });

    if (new Date() > new Date(data.expires_at)) {
        return res.status(400).json({ error: "expired" });
    }

    // update profile
    await supabase
        .from("profiles")
        .update({
            organization_id: data.organization_id,
            role: data.role,
        })
        .eq("id", user.id);

    await supabase
        .from("invites")
        .update({ accepted: true })
        .eq("id", data.id);

    res.json({ success: true });
};

export const getInvoices = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from("invoices")
            .select("*")
            .eq("chamber_id", req.user.chamber_id)
            .order("created_at", { ascending: false });

        if (error) throw error;

        res.json(data);
    } catch {
        res.status(500).json({ error: "failed to fetch invoices" });
    }
};