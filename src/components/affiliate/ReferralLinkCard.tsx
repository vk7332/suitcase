import React from "react";
import { Affiliate } from "@/types/affiliate";
import { generateReferralLink } from "@/utils/referralUtils";

interface Props {
  affiliate: Affiliate;
}

const ReferralLinkCard: React.FC<Props> = ({ affiliate }) => {
  const referralLink = generateReferralLink(affiliate.referral_code);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  return (
    <div className="rounded-2xl shadow-md p-6 bg-white border">
      <h2 className="text-xl font-semibold mb-2">Your Referral Link</h2>
      <p className="text-gray-600 mb-4">
        Share this link to earn rewards when users sign up.
      </p>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="w-full p-2 border rounded-lg bg-gray-100"
        />
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default ReferralLinkCard;


