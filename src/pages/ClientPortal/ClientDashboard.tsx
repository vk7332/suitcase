import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useAuth } from "../../hooks/useAuth";

export default function ClientDashboard() {
    const { user } = useAuth();

    const [cases, setCases] = useState<any[]>([]);

    useEffect(() => {
        if (!user) {
            return <div>Please login</div>;
        }
        loadCases();

    }, [user]);

    const loadCases = async () => {
        // 📥 FIND CLIENT
        const { data: client } = await supabase
            .from("clients")
            .select("*")
            .eq("email", user.email)
            .single();

        if (!client) return;

        // 📥 LOAD CASES
        const { data } = await supabase
            .from("cases")
            .select("*")
            .eq("client_id", client.id);

        setCases(data || []);
    };

    return (
        <div className="p-6">

            <h2 className="text-xl font-bold mb-4">
                My Cases
            </h2>

            {cases.map((c) => (
                <div key={c.id} className="border p-3 mb-2">
                    <p className="font-bold">{c.title}</p>
                    <p>Status: {c.status}</p>
                    <p>
                        Next Date:{" "}
                        {c.next_date
                            ? new Date(c.next_date).toLocaleDateString()
                            : "-"}
                    </p>
                </div>
            ))}

        </div>
    );
}



