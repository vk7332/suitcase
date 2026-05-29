import RoleHome, { roleIcons } from "@/pages/dashboard/RoleHome";

export default function JuniorAdvocateDashboard() {
    return (
        <RoleHome
            title="Junior Advocate Dashboard"
            subtitle="Track assigned matters, hearings, drafts, and chamber work."
            stats={[
                { label: "Assigned Cases", value: "0" },
                { label: "Upcoming Hearings", value: "0" },
                { label: "Drafts Pending", value: "0" },
            ]}
            actions={[
                { label: "My Cases", to: "/advocate/cases", icon: roleIcons.cases },
                { label: "Draft Library", to: "/drafts", icon: roleIcons.drafts },
                { label: "Calendar", to: "/calendar", icon: roleIcons.calendar },
                { label: "Cause List", to: "/cause-list", icon: roleIcons.legal },
                { label: "AI Drafts", to: "/ai-draft", icon: roleIcons.drafts },
                { label: "Limitation", to: "/calculator/limitation", icon: roleIcons.legal },
            ]}
        />
    );
}
