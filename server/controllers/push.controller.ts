import { supabase } from "../config/supabase";
import { Request, Response } from 'express';

export const saveSubscription = async (req: Request, res: Response) => {
    const sub = req.body;

    await supabase.from("push_subscriptions").insert([sub]);

    res.json({ ok: true });
};