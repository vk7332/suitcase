export default function CourtFeeResult({ result, state, type, amount }: any) {
    if (!result) return null;

    return (
        <div className="mt-6 border p-4 rounded bg-white">

            <h2 className="text-lg font-bold mb-2">
                Court Fee Calculation Sheet
            </h2>

            <p><strong>State:</strong> {state.toUpperCase()}</p>
            <p><strong>Act:</strong> Court Fees Act, 1870</p>

            <p className="mt-2">
                <strong>Type:</strong>{" "}
                {type === "scheduleI" ? "Ad Valorem (Schedule I)" : "Fixed Fee (Schedule II)"}
            </p>

            {type === "scheduleI" && (
                <p><strong>Suit Value:</strong> ₹ {amount}</p>
            )}

            {/* BREAKDOWN */}
            {result.breakdown && (
                <div className="mt-4">
                    <h3 className="font-semibold">Breakdown:</h3>

                    <table className="w-full text-sm mt-2 border">
                        <thead>
                            <tr className="border">
                                <th>Range</th>
                                <th>Amount</th>
                                <th>Rate</th>
                                <th>Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.breakdown.map((row: any, i: number) => (
                                <tr key={i} className="border text-center">
                                    <td>{row.range}</td>
                                    <td>₹ {row.amount}</td>
                                    <td>{row.rate * 100}%</td>
                                    <td>₹ {row.fee}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* TOTAL */}
            <div className="mt-4 text-lg font-bold">
                Total Court Fee: ₹ {result.total || result}
            </div>

            {/* NOTES */}
            <div className="mt-4 text-xs text-gray-600">
                <p>• Calculated as per applicable schedule.</p>
                <p>• Subject to verification with local amendments.</p>
                <p>• For professional use only.</p>
            </div>

        </div>
    );
}