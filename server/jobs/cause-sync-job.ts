import cron from "node-cron";
import { supabase } from "../config/supabase";
import { fetchCauseList } from "../services/cause-list-service.ts";

const normalize = (str: string) =>
    str.replace(/\s+/g, "").toLowerCase();

cron.schedule("0 6 * * *", async () => {
    console.log("🔄 Running daily cause list sync...");

    const { data: cases } = await supabase
        .from("cases")
        .select("*");

    for (const c of cases || []) {
        try {
            const list = await fetchCauseList(c.court_url);

            const match = list.find((item) =>
                normalize(item.caseNo).includes(
                    normalize(c.case_number)
                )
            );

            if (!match) continue;

            const nextDate = new Date(match.date);

            if (isNaN(nextDate.getTime())) continue;

            await supabase.from("case_events").upsert([
                {
                    case_id: c.id,
                    title: "Next Hearing",
                    event_type: "hearing",
                    event_date: nextDate,
                },
            ]);

            console.log("✅ Updated:", c.case_number);
        } catch (err) {
            console.log("❌ Error for case:", c.case_number);
        }
    }
});