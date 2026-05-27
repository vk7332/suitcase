import { useState } from "react";
import { StampDutyEngine } from "../../engines/stamp-duty-engine";

export default function StampDutyCalculator() {
    const [amount, setAmount] = useState(0);
    const [duty, setDuty] = useState(0);

    const handleCalculate = () => {
        const result = StampDutyEngine.calculate(amount);
        setDuty(result);
    };

    return (
        <div className="bg-white p-4 rounded shadow max-w-md">
            <div className="mb-3">
                <label className="block mb-1">Property Value</label>
                <input
                    type="number"
                    className="border p-2 w-full"
                    placeholder="Enter property value"
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
            </div>

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleCalculate}
            >
                Calculate Stamp Duty
            </button>

            <div className="mt-4">
                <h2 className="text-lg font-bold">
                    Stamp Duty: ₹ {duty}
                </h2>
            </div>
        </div>
    );
}


