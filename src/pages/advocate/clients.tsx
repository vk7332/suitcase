import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseclient";

export default function Clients() {
    const [clients, setClients] = useState<any[]>([]);

    useEffect(() => {
        const load = async () => {
            const { data } = await supabase
                .from("clients")
                .select("*");

            setClients(data || []);
        };

        load();
    }, []);

    return (
        <div>
            <h2>Clients</h2>

            {clients.map((c) => (
                <div key={c.id}>{c.name}</div>
            ))}
        </div>
    );
}