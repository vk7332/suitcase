import { fetchCauseList } from "../services/cause-list-service.ts";
import { Request, Response } from 'express';
import { supabase } from "../config/supabase";
import { match } from "assert/strict";

export const syncNextHearing = async (req: Request, res: Response) => {
    const { case_id, caseNumber, courtUrl } = req.body;
    try {
        const list = await fetchCauseList(courtUrl);
        // 🔍 find matching case
        const match = list.find((c) => c.caseNo.includes(caseNumber));
        if (!match) {
            return res.json({ message: "Case not found in cause list" });
        }
        const nextDate = new Date(match.date);
        if (isNaN(nextDate.getTime())) {
            return res.json({ error: "Invalid date format" });
        }
        // 🔄 update or insert hearing event
        await supabase.from("case_events").upsert([
            {
                case_id,
                title: "Next Hearing",
                event_type: "hearing",
                event_date: nextDate,
            },
        ]);
        res.json({
            message: "Hearing updated",
            nextDate,
        });
    } catch (err: any) {
        res.status(500).json({
            error: "Sync failed",
        });
    }
};