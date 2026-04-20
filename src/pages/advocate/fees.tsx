import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseclient";

export default function Fees() {
    const [fees, setFees] = useState<any[]>([]);

    useEffect(() => {
        const load = async () => {
            const { data } = await supabase
                .from("fees")
                .select("*");

            setFees(data || []);
        };

        load();
    }, []);

    return (
        <div>
            <h2>Fees</h2>

            {fees.map((f) => (
                <div key={f.id}>₹{f.amount}</div>
            ))}
        </div>
    );
}