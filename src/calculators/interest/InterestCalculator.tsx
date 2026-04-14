import React, { useState } from "react";
import { InterestCalculatorEngine } from "../../engines/court-fee/court-feeSlabEngine";

export default function InterestCalculator() {
    const [p, setP] = useState(0);
    const [r, setR] = useState(0);
    const [t, setT] = useState(0);

    const result = InterestCalculatorEngine.calculate(p, r, t);

    return (
        <div>
            <h2>Interest Calculator</h2>
            <input onChange={(e) => setP(+e.target.value)} placeholder="Principal" />
            <input onChange={(e) => setR(+e.target.value)} placeholder="Rate %" />
            <input onChange={(e) => setT(+e.target.value)} placeholder="Time (years)" />

            <p>Interest: ₹ {result.interest}</p>
            <p>Total: ₹ {result.total}</p>
        </div>
    );
}
