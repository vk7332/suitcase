import React from "react";
import { Affiliate } from "@/types/affiliate";

interface Props {
  affiliate: Affiliate;
}

const EarningsCard: React.FC<Props> = ({ affiliate }) => {
  return (
    <div className="rounded-2xl shadow-md p-6 bg-white border">
      <h2 className="text-xl font-semibold mb-4">Earnings Overview</h2>
      <div className="space-y-2">
        <p><strong>Total Earnings:</strong> ₹{affiliate.total_earnings}</p>
        <p><strong>Total Referrals:</strong> {affiliate.total_referrals}</p>
        <p><strong>Commission Rate:</strong> {affiliate.commission_rate}%</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="capitalize">{affiliate.status}</span>
        </p>
      </div>
    </div>
  );
};

export default EarningsCard;
