import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseclient";

export default function PaymentsTable() {
    const [payments, setPayments] = useState<any[]>([]);

    useEffect(() => {
        const load = async () => {
            const { data } = await supabase
                .from("earnings")
                .select("*");

            setPayments(data || []);
        };

        load();
    }, []);

    return (
        <div>
            <h2>Payments</h2>

            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {payments.map((p) => (
                        <tr key={p.id}>
                            <td>{p.user_id}</td>
                            <td>₹{p.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}