import { useAffiliate } from "../../hooks/useAffiliate";
import { getReferralLink } from "../../utils/referralUtils";

const AffiliateDashboard = () => {
    const { affiliate, referrals, commissions } = useAffiliate();

    if (!affiliate) return <div className="p-6">Loading...</div>;

    const totalEarnings = commissions.reduce(
        (sum: number, c: any) => sum + Number(c.amount),
        0
    );

    const referralLink = getReferralLink(affiliate.referral_code);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                🤝 Affiliate Dashboard
            </h1>

            {/* Referral Link */}
            <div className="bg-white shadow rounded p-4 mb-4">
                <h2 className="font-semibold">Your Referral Link</h2>
                <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="w-full border p-2 mt-2"
                />
                <button
                    onClick={() => navigator.clipboard.writeText(referralLink)}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Copy Link
                </button>
            </div>

            {/* Earnings */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-green-100 p-4 rounded">
                    <h3>Total Earnings</h3>
                    <p className="text-xl font-bold">₹{totalEarnings}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded">
                    <h3>Total Referrals</h3>
                    <p className="text-xl font-bold">{referrals.length}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded">
                    <h3>Commission Records</h3>
                    <p className="text-xl font-bold">{commissions.length}</p>
                </div>
            </div>

            {/* Referrals Table */}
            <div className="bg-white shadow rounded p-4">
                <h2 className="font-semibold mb-2">Referrals</h2>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">User ID</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {referrals.map((ref: any) => (
                            <tr key={ref.id}>
                                <td className="p-2 border">
                                    {ref.referred_user_id}
                                </td>
                                <td className="p-2 border">{ref.status}</td>
                                <td className="p-2 border">
                                    {new Date(ref.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AffiliateDashboard;
