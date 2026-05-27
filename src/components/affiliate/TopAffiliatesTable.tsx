import React from "react";
import { TopAffiliate } from "@/types/affiliate-analytics";

interface Props {
    affiliates: TopAffiliate[];
}

const TopAffiliatesTable: React.FC<Props> = ({ affiliates }) => {
    return (
        <div className="p-6 bg-white shadow rounded-xl border">
            <h2 className="text-lg font-semibold mb-4">Top Affiliates</h2>
            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">Referral Code</th>
                        <th className="p-2 border">Referrals</th>
                        <th className="p-2 border">Earnings (₹)</th>
                    </tr>
                </thead>
                <tbody>
                    {affiliates.map((affiliate) => (
                        <tr key={affiliate.id} className="text-center">
                            <td className="p-2 border">{affiliate.referral_code}</td>
                            <td className="p-2 border">{affiliate.total_referrals}</td>
                            <td className="p-2 border">
                                ₹{affiliate.total_earnings}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopAffiliatesTable;


