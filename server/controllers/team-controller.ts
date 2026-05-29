import { supabase } from "../config/supabase";
import { Request, Response } from 'express';

// 🔹 get team members (org-scoped)
export const getTeamMembers = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        const { data, error } = await supabase
            .from("profiles")
            .select("id, name, email, role")
            .eq("organization_id", user.organization_id);

        if (error) throw error;

        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: "failed to fetch team" });
    }
};

// 🔹 update member role (admin only)
export const updateMemberRole = async (req: Request, res: Response) => {
    try {
        const { userId, role } = req.body;
        const currentUser = req.user;

        if (currentUser.role !== "admin") {
            return res.status(403).json({ error: "forbidden" });
        }

        const { error } = await supabase
            .from("profiles")
            .update({ role })
            .eq("id", userId)
            .eq("organization_id", currentUser.organization_id);

        if (error) throw error;

        res.json({ success: true });
    } catch (err: any) {
        res.status(500).json({ error: "failed to update role" });
    }
};

// 🔹 remove member
export const removeMember = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const currentUser = req.user;

        if (currentUser.role !== "admin") {
            return res.status(403).json({ error: "forbidden" });
        }

        const { error } = await supabase
            .from("profiles")
            .update({
                organization_id: null,
                role: "client",
            })
            .eq("id", userId)
            .eq("organization_id", currentUser.organization_id);

        if (error) throw error;

        res.json({ success: true });
    } catch (err: any) {
        res.status(500).json({ error: "failed to remove member" });
    }
};