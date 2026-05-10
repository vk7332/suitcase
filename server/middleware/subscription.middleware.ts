import { supabase } from "../config/supabase";
import { Request, Response, NextFunction } from "express";

export const requireActiveSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;

        const { data, error } = await supabase
            .from("subscriptions")
            .select("status, current_period_end")
            .eq("user_id", userId)
            .maybeSingle();

        if (error) throw error;

        if (!data || data.status !== "active") {
            return res.status(402).json({
                message: "Active subscription required",
            });
        }

        next();
    } catch (err) {
        next(err);
    }
};
