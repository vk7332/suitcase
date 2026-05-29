import React, { useState } from "react";
import { requestPayout } from "@/services/affiliate-service";

interface Props {
  affiliateId: string;
}

const PayoutRequestForm: React.FC<Props> = ({ affiliateId }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await requestPayout(affiliateId, Number(amount));
      alert("Payout request submitted successfully!");
      setAmount("");
    } catch (error) {
      alert("Failed to submit payout request.");
    }

    setLoading(false);
  };

  return (
    <div className="rounded-2xl shadow-md p-6 bg-white border">
      <h2 className="text-xl font-semibold mb-4">Request Payout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          {loading ? "Processing..." : "Request Payout"}
        </button>
      </form>
    </div>
  );
};

export default PayoutRequestForm;


