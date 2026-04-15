import React from "react";

interface Referral {
  id: string;
  referred_email: string;
  status: string;
  reward: number;
  created_at: string;
}

interface Props {
  referrals: Referral[];
}

const ReferralsTable: React.FC<Props> = ({ referrals }) => {
  return (
    <div className="rounded-2xl shadow-md p-6 bg-white border">
      <h2 className="text-xl font-semibold mb-4">Your Referrals</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Reward (₹)</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {referrals.length > 0 ? (
              referrals.map((ref) => (
                <tr key={ref.id} className="text-center">
                  <td className="p-2 border">{ref.referred_email}</td>
                  <td className="p-2 border capitalize">{ref.status}</td>
                  <td className="p-2 border">{ref.reward}</td>
                  <td className="p-2 border">
                    {new Date(ref.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No referrals yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferralsTable;
