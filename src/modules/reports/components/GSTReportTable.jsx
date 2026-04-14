import React from "react";

const GSTReportTable = ({ data }) => {
    return (
        <table className="w-full border shadow-md">
            <thead className="bg-gray-100">
                <tr>
                    <th className="p-2 border">Invoice No.</th>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Client</th>
                    <th className="p-2 border">Taxable Amount</th>
                    <th className="p-2 border">GST %</th>
                    <th className="p-2 border">GST Amount</th>
                    <th className="p-2 border">Total</th>
                    <th className="p-2 border">Place of Supply</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index} className="text-center">
                        <td className="p-2 border">{row.invoice_number}</td>
                        <td className="p-2 border">{row.issue_date}</td>
                        <td className="p-2 border">{row.clients?.name}</td>
                        <td className="p-2 border">₹{row.taxable_amount}</td>
                        <td className="p-2 border">{row.gst_percentage}%</td>
                        <td className="p-2 border">₹{row.gst_amount}</td>
                        <td className="p-2 border">₹{row.total_amount}</td>
                        <td className="p-2 border">{row.place_of_supply}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default GSTReportTable;
