import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useAuth } from "../../hooks/useAuth";
import { getUpcomingHearings } from "../../engines/reminder-engine";

export default function ReminderAlert() {
    const { user } = useAuth();
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        if (!user) return;

        loadAlerts();
    }, [user]);

    const loadAlerts = async () => {
        const { data } = await supabase
            .from("cases")
            .select("*")
            .eq("user_id", user.id);

        const upcoming = getUpcomingHearings(data || []);
        setAlerts(upcoming);
    };

    if (alerts.length === 0) return null;

    return (
        <div className="bg-yellow-100 border p-3 mb-4">

            <h3 className="font-bold text-yellow-800">
                🔔 Upcoming Hearings
            </h3>

            {alerts.map((a) => (
                <div key={a.id} className="text-sm mt-1">
                    ⚖️ {a.title} —{" "}
                    {new Date(a.next_date).toLocaleDateString()}
                </div>
            ))}
        </div>
    );
}


