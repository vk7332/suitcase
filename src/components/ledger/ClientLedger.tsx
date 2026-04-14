import { useEffect, useState } from "react";
import { getLedger, addLedger } from "../../services/LedgerService";

export default function ClientLedger({ clientId }: any) {
    const [entries, setEntries] = useState<any[]>([]);
    const [form, setForm] = useState({
        type: "credit",
        amount: 0,
        description: "",
    });

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const data = await getLedger(clientId);
        setEntries(data || []);
    };

    const handleAdd = async () => {
        await addLedger({
            ...form,
            client_id: clientId,
        });
        load();
    };

    const balance = entries.reduce((acc, e) => {
        return e.type === "credit"
            ? acc + Number(e.amount)
            : acc - Number(e.amount);
    }, 0);

    return (
        <div className="border p-4 mt-4">
            <h3 className="font-bold">Client Ledger</h3>

            <input
                placeholder="Amount"
                onChange={(e) =>
                    setForm({ ...form, amount: Number(e.target.value) })
                }
            />

            <select
                onChange={(e) =>
                    setForm({ ...form, type: e.target.value })
                }
            >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
            </select>

            <input
                placeholder="Description"
                onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                }
            />

            <button
                onClick={handleAdd}
                className="bg-blue-600 text-white p-2"
            >
                Add Entry
            </button>

            <h4 className="mt-3">Balance: ₹ {balance}</h4>

            <ul>
                {entries.map((e) => (
                    <li key={e.id}>
                        {e.type} ₹{e.amount} - {e.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}
