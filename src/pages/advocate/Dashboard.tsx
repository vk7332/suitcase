import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabase-client";

import RoleHome, {
    roleIcons,
} from "@/pages/dashboard/RoleHome";

import UpcomingHearingsCard from "@/components/dashboard/UpcomingHearingsCard";

export default function AdvocateDashboard() {
    const [totalCases, setTotalCases] = useState(0);

    const [activeHearings, setActiveHearings] =
        useState(0);

    useEffect(() => {
        loadStats();
    }, []);

    async function loadStats() {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const { count: caseCount } = await supabase
            .from("cases")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq("created_by", user.id);

        setTotalCases(caseCount || 0);

        const today =
            new Date().toISOString().split("T")[0];

        const { count: hearingCount } =
            await supabase
                .from("cases")
                .select("*", {
                    count: "exact",
                    head: true,
                })
                .eq("created_by", user.id)
                .gte(
                    "next_hearing_date",
                    today
                );
console.log(
  "HEARING COUNT",
  hearingCount
);

console.log(
  "CASE COUNT",
  caseCount
);
        setActiveHearings(
            hearingCount || 0
        );
    }

    return (
        <div className="space-y-6">
            <RoleHome
                title="Advocate Dashboard"
                subtitle="Manage matters, clients, hearings, billing, and drafting from your chamber workspace."
                stats={[
                    {
                        label: "Total Cases",
                        value: String(totalCases),
                    },
                    {
                        label: "Active Hearings",
                        value: String(activeHearings),
                    },
                    {
                        label: "Pending Invoices",
                        value: "0",
                    },
                ]}
                actions={[
                    {
                        label: "My Cases",
                        to: "/advocate/cases",
                        icon: roleIcons.cases,
                    },
                    {
                        label: "Client List",
                        to: "/clients",
                        icon: roleIcons.clients,
                    },
                    {
                        label: "AI Drafts",
                        to: "/ai-draft",
                        icon: roleIcons.drafts,
                    },
                    {
                        label: "Cause List",
                        to: "/cause-list",
                        icon: roleIcons.legal,
                    },
                    {
                        label: "Calendar",
                        to: "/calendar",
                        icon: roleIcons.calendar,
                    },
                    {
                        label: "Invoices",
                        to: "/invoices",
                        icon: roleIcons.billing,
                    },
                ]}
            />

            <div className="px-6 pb-10">
                <UpcomingHearingsCard />
            </div>
        </div>
    );
}