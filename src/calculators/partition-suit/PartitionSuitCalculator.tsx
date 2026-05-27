import { useState } from "react";
import { calculatePartitionSuit } from "@/engines/partition-suit-engine";

export default function PartitionSuitCalculator() {
    const [value, setValue] = useState(0);
    const [result, setResult] = useState<any>(null);

    return (
        <div className="p-6 bg-white rounded shadow">
            <h2 className="text-lg font-bold mb-4">Partition Suit Calculator</h2>

            <input
                type="number"
                placeholder="Property Value"
                className="border p-2 w-full mb-3"
                onChange={(e) => setValue(Number(e.target.value))}
            />

            <button
                onClick={() => setResult(calculatePartitionSuit(value))}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Calculate
            </button>

            {result && (
                <div className="mt-4">
                    <p>Court Fee: ₹{result.courtFee}</p>
                    <p>Total: ₹{result.total}</p>
                </div>
            )}
        </div>
    );
}

