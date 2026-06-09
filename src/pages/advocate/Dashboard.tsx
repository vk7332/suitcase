import RoleHome, {
    roleIcons,
} from "@/pages/dashboard/RoleHome";

import UpcomingHearingsCard from "@/components/dashboard/UpcomingHearingsCard";

export default function AdvocateDashboard() {
    return (
        <div className="space-y-6">

            {/* MAIN ROLE HOME */}

            <RoleHome
                title="Advocate Dashboard"
                subtitle="Manage matters, clients, hearings, billing, and drafting from your chamber workspace."
                stats={[
                    {
                        label: "Total Cases",
                        value: "0",
                    },
                    {
                        label: "Active Hearings",
                        value: "0",
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

            {/* UPCOMING HEARINGS */}

            <div className="px-6 pb-10">
                <UpcomingHearingsCard />
            </div>

        </div>
    );
}