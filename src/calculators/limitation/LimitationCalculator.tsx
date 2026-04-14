import React, { useState } from "react";
import { LimitationCalculatorEngine } from "../../engines/court-fee/court-feeSlabEngine";

export default function LimitationCalculator() {
    const [date, setDate] = useState("");

    const result = LimitationCalculatorEngine.calculate(date, 3);

    return (
        <div>
            <h2>Limitation Calculator</h2>
            <input type="date" onChange={(e) => setDate(e.target.value)} />

            {result && <p>Last Date: {result}</p>}
        </div>
    );
}
