import { Link, useNavigate } from "react-router-dom";
import ReminderAlert from "../../components/notifications/ReminderAlert";
import { useAuth } from "../../hooks/use-auth";
import { runAutoReminders } from "../../engines/auto-reminder-engine";
import { useEffect } from "react";
import { supabase } from "@/utils/supabase/supabase-client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UpcomingHearingsCard from "@/components/dashboard/UpcomingHearingsCard";

export default function LegalDashboard() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) return <div className="p-6">Loading...</div>;
    useEffect(() => {
        if (!user) return;

        loadCasesAndClients();
    }, [user]);

    const loadCasesAndClients = async () => {
        if (!user) return;

        const { data: cases } = await supabase
            .from("cases")
            .select("*")
            .eq("user_id", user.id);

        const { data: clients } = await supabase
            .from("clients")
            .select("*")
            .eq("user_id", user.id);

        runAutoReminders(cases || [], clients || []);
    };

    if (!user) {
        return (
            <div className="p-6">
                Please Login to Continue
            </div>
        );
    }

    return (
        <DashboardLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">
                    ⚖️ Suitcase - Legal Dashboard
                    <ReminderAlert />
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <Link to="/calculator/court-fee" className="border p-4 hover:bg-gray-50 transition">
                        Court Fee Calculator
                    </Link>

                    <Link to="/advocate/cases" className="border p-4 hover:bg-gray-50 transition">
                        Cases
                    </Link>

                    <Link to="/advocate/clients" className="border p-4 hover:bg-gray-50 transition">
                        Clients
                    </Link>

                    <Link to="/calculator/limitation" className="border p-4 hover:bg-gray-50 transition">
                        Limitation Alerts
                    </Link>

                    <Link to="/drafts" className="border p-4 hover:bg-gray-50 transition">
                        Draft Library
                    </Link>

                    <Link to="/ai-draft" className="border p-4 hover:bg-gray-50 transition">
                        AI Draft Generator
                    </Link>

                    <Link to="/cause-list" className="border p-4 hover:bg-gray-50 transition">
                        Cause List
                    </Link>

                    <Link to="/calendar" className="border p-4 hover:bg-gray-50 transition">
                        Calendar
                    </Link>

                    <Link to="/admin" className="border p-4 hover:bg-gray-50 transition">
                        Admin Panel
                    </Link>

                </div>
            </div>
        </DashboardLayout>
    );
}
