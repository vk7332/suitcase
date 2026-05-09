import { supabase } from "../config/supabase";
import { Request, Response } from 'express';
import { PLAN_LIMITS } from "../config/planLimits";

export const getUsage = async (req: Request, res: Response) => {
    const user = req.user;

    const { data: chamber } = await supabase
        .from("chambers")
        .select("*")
        .eq("id", user.chamber_id)
        .single();

    const plan = chamber.plan;
    const limits = PLAN_LIMITS[plan];

    const { count: caseCount } = await supabase
        .from("cases")
        .select("*", { count: "exact", head: true })
        .eq("chamber_id", chamber.id);

    const { count: memberCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("chamber_id", chamber.id);

    res.json({
        plan,
        usage: {
            cases: caseCount,
            members: memberCount,
        },
        limits,
    });
};