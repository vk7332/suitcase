import RoleHome, { roleIcons } from "@/pages/dashboard/RoleHome";

export default function LitigantDashboard() {
    return (
        <RoleHome
            title="Litigant Dashboard"
            subtitle="Follow case progress, documents, hearings, and shared updates."
            stats={[
                { label: "Linked Cases", value: "0" },
                { label: "Next Hearing", value: "0" },
                { label: "Shared Documents", value: "0" },
            ]}
            actions={[
                { label: "My Cases", to: "/advocate/cases", icon: roleIcons.cases },
                { label: "Documents", to: "/documents", icon: roleIcons.drafts },
                { label: "Calendar", to: "/calendar", icon: roleIcons.calendar },
                { label: "Cause List", to: "/cause-list", icon: roleIcons.legal },
                { label: "Client Ledger", to: "/ledger", icon: roleIcons.billing },
                { label: "Portal", to: "/portal", icon: roleIcons.clients },
            ]}
        />
    );
}
