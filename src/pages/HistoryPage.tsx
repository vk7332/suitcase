import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
    getCalculations,
    deleteCalculation,
} from "../services/CalculationHistoryService";

export default function HistoryPage() {
    const [data, setData] = useState<any[]>([]);

    const loadData = async () => {
        const res = await getCalculations();
        setData(res);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id: string) => {
        await deleteCalculation(id);
        loadData();
    };

    return (
        <DashboardLayout>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">
                    Calculation History
                </h2>

                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th>Date</th>
                            <th>State</th>
                            <th>Suit Amount</th>
                            <th>Total Cost</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id} className="border-t">
                                <td>
                                    {new Date(row.created_at).toLocaleString()}
                                </td>
                                <td>{row.state}</td>
                                <td>₹ {row.suit_amount}</td>
                                <td>₹ {row.total_cost}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            localStorage.setItem("loadCalculation", JSON.stringify(row))
                                        }
                                    >
                                        Load
                                    </button>
                                    <button
                                        onClick={() => handleDelete(row.id)}
                                        className="text-red-500"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}
