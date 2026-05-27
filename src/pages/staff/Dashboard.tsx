import RoleHome, { roleIcons } from "@/pages/dashboard/RoleHome";

export default function StaffDashboard() {
    return (
        <RoleHome
            title="Staff / Clerk Dashboard"
            subtitle="Manage filing tasks, client records, calendars, and office billing."
            stats={[
                { label: "Filing Tasks", value: "0" },
                { label: "Client Records", value: "0" },
                { label: "Pending Invoices", value: "0" },
            ]}
            actions={[
                { label: "Client List", to: "/clients", icon: roleIcons.clients },
                { label: "Cases", to: "/advocate/cases", icon: roleIcons.cases },
                { label: "Invoices", to: "/invoices", icon: roleIcons.billing },
                { label: "Client Ledger", to: "/ledger", icon: roleIcons.billing },
                { label: "Calendar", to: "/calendar", icon: roleIcons.calendar },
                { label: "Filing Cost", to: "/calculator/filing-cost", icon: roleIcons.legal },
            ]}
        />
    );
}
