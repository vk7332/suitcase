import { useState } from "react";
import { calculateCourtFee } from "@/engines/court-fee/court-fee-calculator-engine";
s
export default function CourtFeeCalculator() {
    const [amount, setAmount] = useState(0);
    const [state, setState] = useState("delhi");

    const fee = calculateCourtFee(amount, state as any);

    return (
        <div>
            <h2>Court Fee Calculator</h2>

            <input
                type="number"
                placeholder="Enter Amount"
                onChange={(e) => setAmount(Number(e.target.value))}
            />

            <select onChange={(e) => setState(e.target.value)}>
                <option value="delhi">Delhi</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="uttar-pradesh">Uttar Pradesh</option>
            </select>

            <h3>Fee: ₹{fee}</h3>
        </div>
    );
}