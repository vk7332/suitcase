import RoleHome, { roleIcons } from "@/pages/dashboard/RoleHome";

export default function PublicDashboard() {
    return (
        <RoleHome
            title="Public Dashboard"
            subtitle="Access public legal tools, case utilities, and portal services."
            stats={[
                { label: "Available Tools", value: "8" },
                { label: "Saved Searches", value: "0" },
                { label: "Portal Requests", value: "0" },
            ]}
            actions={[
                { label: "Portal Login", to: "/portal", icon: roleIcons.clients },
                { label: "Court Fee", to: "/calculator/court-fee", icon: roleIcons.legal },
                { label: "Limitation", to: "/calculator/limitation", icon: roleIcons.calendar },
                { label: "Stamp Duty", to: "/calculator/stamp-duty", icon: roleIcons.billing },
                { label: "Interest Calculator", to: "/calculator/interest", icon: roleIcons.billing },
                { label: "Contact Support", to: "/contact", icon: roleIcons.clients },
            ]}
        />
    );
}
