import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useParams } from "react-router-dom";

const ClientLedgerPage: React.FC = () => {
    const { clientId } = useParams();
    const [entries, setEntries] = useState<any[]>([]);

    useEffect(() => {
        fetchLedger();
    }, [clientId]);

    const fetchLedger = async () => {
        const { data, error } = await supabase
            .from("ledger_entries")
            .select("*")
            .eq("client_id", clientId)
            .order("entry_date", { ascending: true });

        if (!error) setEntries(data || []);
    };

    const balance = entries.reduce(
        (acc, entry) => acc + entry.debit - entry.credit,
        0
    );

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Client Ledger</h1>

            <table className="w-full border mb-4">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Description</th>
                        <th className="p-2 border">Debit</th>
                        <th className="p-2 border">Credit</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry) => (
                        <tr key={entry.id}>
                            <td className="p-2 border">{entry.entry_date}</td>
                            <td className="p-2 border">{entry.description}</td>
                            <td className="p-2 border">₹{entry.debit}</td>
                            <td className="p-2 border">₹{entry.credit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="text-xl font-bold">
                Outstanding Balance: ₹{balance.toFixed(2)}
            </h2>
        </div>
    );
};

export default ClientLedgerPage;


