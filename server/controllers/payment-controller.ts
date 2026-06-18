import { supabase } from "../config/supabase.js";
import { Request, Response } from 'express';

// 📊 get payment history (per chamber)
export const getPayments = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        const { data, error } = await supabase
            .from("payments")
            .select("*")
            .eq("chamber_id", user.chamber_id)
            .order("created_at", { ascending: false });

        if (error) throw error;

        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: "failed to fetch payments" });
    }
};