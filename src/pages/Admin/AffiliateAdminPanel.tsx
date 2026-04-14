import { useEffect, useState } from "react";
import {
    fetchAffiliates,
    fetchCommissions,
    fetchPayoutRequests,
    updatePayoutStatus,
} from "../../services/AffiliateAdminService";
import {
    Affiliate,
    Commission,
    PayoutRequest,
} from "../../types/affiliate";
import { processPayout } from "../../services/PayoutService";

const handleProcessPayout = async (payout: any) => {
    try {
        await processPayout({
            payout_id: payout.id,
            amount: payout.amount,
            method: payout.payout_method,
            name: payout.name,
            email: payout.email,
            contact: payout.contact,
            account_number: payout.account_number,
            ifsc: payout.ifsc,
            upi_id: payout.upi_id,
        });

        alert("Payout processed successfully!");
        window.location.reload();
    } catch (error) {
        alert("Failed to process payout.");
    }
};

const AffiliateAdminPanel = () => {
    const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
    const [commissions, setCommissions] = useState<Commission[]>([]);
    const [payouts, setPayouts] = useState<PayoutRequest[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setAffiliates(await fetchAffiliates());
        setCommissions(await fetchCommissions());
        setPayouts(await fetchPayoutRequests());
    };

    const handlePayoutUpdate = async (
        id: string,
        status: "approved" | "rejected" | "paid"
    ) => {
        await updatePayoutStatus(id, status);
        loadData();
    };

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold">
                🤝 Affiliate Admin Panel
            </h1>

            {/* Affiliates */}
            <section>
                <h2 className="text-xl font-semibold mb-3">
                    Affiliates
                </h2>
                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">Referral Code</th>
                            <th className="border p-2">Role</th>
                            <th className="border p-2">Earnings</th>
                            <th className="border p-2">Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {affiliates.map((a) => (
                            <tr key={a.id}>
                                <td className="border p-2">{a.referral_code}</td>
                                <td className="border p-2">{a.role}</td>
                                <td className="border p-2">₹{a.total_earnings}</td>
                                <td className="border p-2">
                                    {new Date(a.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Commissions */}
            <section>
                <h2 className="text-xl font-semibold mb-3">
                    Commissions
                </h2>
                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">Referrer</th>
                            <th className="border p-2">Plan</th>
                            <th className="border p-2">Amount</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commissions.map((c) => (
                            <tr key={c.id}>
                                <td className="border p-2">{c.referrer_id}</td>
                                <td className="border p-2">{c.plan}</td>
                                <td className="border p-2">₹{c.amount}</td>
                                <td className="border p-2">{c.status}</td>
                                <td className="border p-2">
                                    {new Date(c.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Payout Requests */}
            <section>
                <h2 className="text-xl font-semibold mb-3">
                    Payout Requests
                </h2>
                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">User</th>
                            <th className="border p-2">Amount</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payouts.map((p) => (
                            <tr key={p.id}>
                                <td className="border p-2">{p.user_id}</td>
                                <td className="border p-2">₹{p.amount}</td>
                                <td className="border p-2">{p.status}</td>
                                <td className="border p-2 space-x-2">
                                    <button
                                        onClick={() =>
                                            handlePayoutUpdate(p.id, "approved")
                                        }
                                        className="bg-green-600 text-white px-2 py-1 rounded"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() =>
                                            handlePayoutUpdate(p.id, "rejected")
                                        }
                                        className="bg-red-600 text-white px-2 py-1 rounded"
                                    >
                                        Reject
                                    </button>

                                    <button
                                        onClick={() => handleProcessPayout(p)}
                                        className="bg-purple-600 text-white px-3 py-1 rounded"
                                    >
                                        Pay via Razorpay
                                    </button>

                                    <button
                                        onClick={() =>
                                            handlePayoutUpdate(p.id, "paid")
                                        }
                                        className="bg-blue-600 text-white px-2 py-1 rounded"
                                    >
                                        Mark Paid
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default AffiliateAdminPanel;
