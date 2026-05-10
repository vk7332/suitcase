import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useAuth } from "../../hooks/useAuth";

export default function CauseListPage() {
    const { user } = useAuth();
    const [cases, setCases] = useState<any[]>([]);

    useEffect(() => {
        if (!user) return;

        load();
    }, [user]);

    const load = async () => {
        const today = new Date().toISOString().split("T")[0];

        const { data } = await supabase
            .from("cases")
            .select("*")
            .eq("user_id", user.id)
            .eq("next_date", today);

        setCases(data || []);
    };

    return (
        <div className="p-6">

            <h2 className="text-xl font-bold mb-4">
                📜 Today Cause List
            </h2>

            {cases.length === 0 && (
                <p>No cases today</p>
            )}

            {cases.map((c) => (
                <div key={c.id} className="border p-3 mb-2">
                    ⚖️ {c.title} ({c.case_number})
                </div>
            ))}

        </div>
    );
}



