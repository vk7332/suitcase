import React, { useState } from "react";
import { FilingCostEngine } from "../../engines/filing-cost-engine";

const FilingCostCalculator = () => {
    const [input, setInput] = useState({
        courtFee: 0,
        defendants: 1,
        applications: 0,
        affidavits: 0,
        notaryDocs: 0,
        vakalatnama: true,
    });

    const [result, setResult] = useState<any>();

    return (
        <div>
            <h2>Filing Cost Calculator</h2>

            <input placeholder="Court Fee" onChange={(e) =>
                setInput({ ...input, courtFee: +e.target.value })
            } />

        <button onClick={() =>
            setResult(FilingCostEngine.calculate(input))
        }>
            Calculate
        </button>

        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
);
};

export default FilingCostCalculator;


