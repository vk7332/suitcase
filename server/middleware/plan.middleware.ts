import { supabase } from "../config/supabase";
import { PLAN_LIMITS } from "../config/planLimits";
import { Request, Response, NextFunction } from 'express';

export const enforcePlan = (feature: "cases" | "members") => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        const { data: chamber } = await supabase
            .from("chambers")
            .select("*")
            .eq("id", user.chamber_id)
            .single();

        const limits = PLAN_LIMITS[chamber.plan as keyof typeof PLAN_LIMITS];

        if (feature === "members") {
            const { count } = await supabase
                .from("profiles")
                .select("*", { count: "exact", head: true })
                .eq("chamber_id", chamber.id);

            if (count && count >= limits.members) {
                return res.status(403).json({
                    error: "member limit reached, upgrade plan",
                });
            }
        }

        if (feature === "cases") {
            const { count } = await supabase
                .from("cases")
                .select("*", { count: "exact", head: true })
                .eq("chamber_id", chamber.id);

            if (count && count >= limits.cases) {
                return res.status(403).json({
                    error: "case limit reached, upgrade plan",
                });
            }
        }

        next();
    };
};