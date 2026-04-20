interface Payment {
    id: string;
    amount: number;
    plan: string;
    created_at: string;
}

interface Props {
    payments: Payment[];
}

export default function RecentTransactions({ payments }: Props) {
    return (
        <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">
                Recent Transactions
            </h2>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-2">Plan</th>
                        <th className="text-left py-2">Amount</th>
                        <th className="text-left py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id} className="border-b">
                            <td className="py-2">{payment.plan}</td>
                            <td className="py-2">₹{payment.amount}</td>
                            <td className="py-2">
                                {new Date(payment.created_at).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


