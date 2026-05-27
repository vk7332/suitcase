import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabase-client";
import { useAuth } from "../../hooks/use-auth";

export default function CalendarPage() {
    const { user } = useAuth();
    const [cases, setCases] = useState<any[]>([]);

    useEffect(() => {
        if (!user) return;

        load();
    }, [user]);

    const load = async () => {
        const { data } = await supabase
            .from("cases")
            .select("*")
            .eq("user_id", user.id);

        setCases(data || []);
    };

    return (
        <div className="p-6">

            <h2 className="text-xl font-bold mb-4">
                📅 Hearing Calendar
            </h2>

            <div className="space-y-2">

                {cases
                    .filter((c) => c.next_date)
                    .map((c) => (
                        <div
                            key={c.id}
                            className="border p-3"
                        >
                            <p className="font-bold">{c.title}</p>
                            <p>
                                {new Date(c.next_date).toDateString()}
                            </p>
                        </div>
                    ))}

            </div>
        </div>
    );
}



