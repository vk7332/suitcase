import { Link } from "react-router-dom";
import ReminderAlert from "../../components/notifications/ReminderAlert";
import { useAuth } from "../../hooks/useAuth";
import { runAutoReminders } from "../../engines/AutoReminderEngine";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LegalDashboard() {
    const { user, loading } = useAuth();

    if (loading) return <div className="p-6">Loading...</div>;
    useEffect(() => {
        if (!user) return;

        loadCasesAndClients();
    }, [user]);

    const loadCasesAndClients = async () => {
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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                ⚖️ Suitcase - Legal Dashboard
                <ReminderAlert />
            </h1>

            <div className="grid grid-cols-2 gap-4">

                <Link to="/court-fee" className="border p-4">
                    Court Fee Calculator
                </Link>

                <Link to="/cases" className="border p-4">
                    Cases
                </Link>

                <Link to="/clients" className="border p-4">
                    Clients
                </Link>

                <Link to="/limitation" className="border p-4">
                    Limitation Alerts
                </Link>

                <Link to="/drafts" className="border p-4">
                    Draft Library
                </Link>

                <Link to="/ai-draft" className="border p-4">
                    AI Draft Generator
                </Link>

                <Link to="/cause-list" className="border p-4">
                    Cause List
                </Link>

                <Link to="/admin" className="border p-4">
                    Admin Panel
                </Link>

            </div>
        </div>
    );
}
