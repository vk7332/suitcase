import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Briefcase, CalendarDays, FileText, IndianRupee, Scale, Users } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

type Stat = {
    label: string;
    value: string;
};

type Action = {
    label: string;
    to: string;
    icon: ReactNode;
};

type RoleHomeProps = {
    title: string;
    subtitle: string;
    stats: Stat[];
    actions: Action[];
};

export const roleIcons = {
    cases: <Briefcase size={18} />,
    clients: <Users size={18} />,
    drafts: <FileText size={18} />,
    calendar: <CalendarDays size={18} />,
    billing: <IndianRupee size={18} />,
    legal: <Scale size={18} />,
};

export default function RoleHome({ title, subtitle, stats, actions }: RoleHomeProps) {
    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                <p className="text-gray-500 mt-1">{subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm mb-1">{stat.label}</h3>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                    <h2 className="font-bold text-gray-900">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {actions.map((action) => (
                        <Link
                            key={action.to}
                            to={action.to}
                            className="flex items-center gap-3 rounded-lg border border-gray-100 p-4 text-gray-700 hover:border-[#089CCE] hover:bg-blue-50 hover:text-[#089CCE] transition"
                        >
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-[#089CCE]">
                                {action.icon}
                            </span>
                            <span className="text-sm font-semibold">{action.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
