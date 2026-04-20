import { useEffect, useState } from "react";
import {
    getLimitations,
    addLimitation,
    deleteLimitation,
} from "../../services/LimitationService";

import {
    calculateLimitation,
    getDaysRemaining,
    getStatus,
} from "../../engines/limitation-engine";

export default function LimitationPage() {
    const [list, setList] = useState<any[]>([]);
    const [form, setForm] = useState({
        case_id: "",
        action: "",
        start_date: "",
        limitation_days: 0,
        alert_days: 7,
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getLimitations();
        setList(data || []);
    };

    const handleSubmit = async () => {
        const lastDate = calculateLimitation(
            form.start_date,
            Number(form.limitation_days)
        );

        await addLimitation({
            ...form,
            last_date: lastDate.toISOString(),
        });

        loadData();
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
                Limitation Alerts
            </h2>

            {/* FORM */}
            <div className="border p-4 mb-4">
                <input
                    placeholder="Case ID"
                    onChange={(e) =>
                        setForm({ ...form, case_id: e.target.value })
                    }
                />

                <input
                    placeholder="Action (Appeal, Suit, etc)"
                    onChange={(e) =>
                        setForm({ ...form, action: e.target.value })
                    }
                />

                <input
                    type="date"
                    onChange={(e) =>
                        setForm({ ...form, start_date: e.target.value })
                    }
                />

                <input
                    type="number"
                    placeholder="Limitation Days"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            limitation_days: Number(e.target.value),
                        })
                    }
                />

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white p-2"
                >
                    Add
                </button>
            </div>

            {/* TABLE */}
            <table className="w-full border">
                <thead>
                    <tr>
                        <th>Case</th>
                        <th>Action</th>
                        <th>Last Date</th>
                        <th>Days Left</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {list.map((item) => {
                        const days = getDaysRemaining(item.last_date);
                        const status = getStatus(days, item.alert_days);

                        return (
                            <tr
                                key={item.id}
                                className={
                                    status === "expired"
                                        ? "bg-red-200"
                                        : status === "warning"
                                            ? "bg-yellow-200"
                                            : ""
                                }
                            >
                                <td>{item.case_id}</td>
                                <td>{item.action}</td>
                                <td>
                                    {new Date(item.last_date).toLocaleDateString()}
                                </td>
                                <td>{days}</td>
                                <td>{status}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}


