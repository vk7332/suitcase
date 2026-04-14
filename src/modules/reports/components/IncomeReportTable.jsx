import React from "react";

const IncomeReportTable = ({ data }) => {
    return (
        <table className="w-full border shadow-md">
            <thead className="bg-gray-100">
                <tr>
                    <th className="p-2 border">Invoice No.</th>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Client</th>
                    <th className="p-2 border">Amount</th>
                    <th className="p-2 border">Payment Status</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index} className="text-center">
                        <td className="p-2 border">{row.invoice_number}</td>
                        <td className="p-2 border">{row.issue_date}</td>
                        <td className="p-2 border">{row.clients?.name}</td>
                        <td className="p-2 border">₹{row.total_amount}</td>
                        <td className="p-2 border">{row.payment_status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default IncomeReportTable;
