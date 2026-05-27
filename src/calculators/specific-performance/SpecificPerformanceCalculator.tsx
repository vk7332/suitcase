import { useState } from "react";
import { calculateSpecificPerformanceCost } from "@/engines/specific-performance-engine";

const SpecificPerformanceCalculator = () => {
    const [value, setValue] = useState(0);
    const [rate, setRate] = useState(7.5);
    const [result, setResult] = useState<any>(null);

    const handleCalculate = () => {
        const res = calculateSpecificPerformanceCost(value, rate);
        setResult(res);
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4">
                Specific Performance Calculator
            </h2>

            <input
                type="number"
                placeholder="Agreement Value"
                className="border p-2 w-full mb-2"
                onChange={(e) => setValue(Number(e.target.value))}
            />

            <input
                type="number"
                placeholder="Court Fee Rate (%)"
                className="border p-2 w-full mb-2"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
            />

            <button
                onClick={handleCalculate}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Calculate
            </button>

            {result && (
                <div className="mt-4">
                    <p>Court Fee: ₹{result.courtFee}</p>
                    <p>Total Cost: ₹{result.totalCost}</p>
                </div>
            )}
        </div>
    );
};

export default SpecificPerformanceCalculator;


