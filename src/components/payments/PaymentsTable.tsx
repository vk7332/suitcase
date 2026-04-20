export default function PaymentsTable({
    payments,
    onDelete,
}: any) {
    return (
        <table className="w-full border">
            <thead>
                <tr className="bg-gray-100">
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Mode</th>
                    <th>Remarks</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {payments?.map((p: any) => (
                    <tr key={p.id} className="border-t">
                        <td>{p.payment_date}</td>
                        <td>₹ {p.amount}</td>
                        <td>{p.payment_mode}</td>
                        <td>{p.remarks}</td>

                        <td>
                            <button
                                onClick={() => onDelete(p.id)}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}


