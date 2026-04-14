import React from "react";

const LedgerTable = ({ entries }) => {
    return (
        <table className="w-full border shadow-md">
            <thead className="bg-gray-100">
                <tr>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Description</th>
                    <th className="p-2 border">Debit (₹)</th>
                    <th className="p-2 border">Credit (₹)</th>
                    <th className="p-2 border">Balance (₹)</th>
                </tr>
            </thead>
            <tbody>
                {entries.map((entry) => (
                    <tr key={entry.id} className="text-center">
                        <td className="p-2 border">{entry.entry_date}</td>
                        <td className="p-2 border">{entry.description}</td>
                        <td className="p-2 border">{entry.debit}</td>
                        <td className="p-2 border">{entry.credit}</td>
                        <td className="p-2 border">{entry.balance}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default LedgerTable;
