import React, { useState } from "react";
import { activateTrial } from "@/services/trialService";

interface Props {
    userId: string;
}

const TrialBanner: React.FC<Props> = ({ userId }) => {
    const [enrollment, setEnrollment] = useState("");
    const [plan, setPlan] = useState<"pro" | "premium">("pro");
    const [message, setMessage] = useState("");

    const handleActivate = async () => {
        try {
            await activateTrial(userId, enrollment, plan);
            setMessage("30-day free trial activated successfully!");
        } catch (error: any) {
            setMessage(error.message);
        }
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg border">
            <h2 className="text-xl font-bold mb-4">
                Activate Your 30-Day Free Trial
            </h2>

            <input
                type="text"
                placeholder="Advocate Enrollment Number"
                value={enrollment}
                onChange={(e) => setEnrollment(e.target.value)}
                className="w-full p-2 border rounded mb-3"
            />

            <select
                value={plan}
                onChange={(e) => setPlan(e.target.value as "pro" | "premium")}
                className="w-full p-2 border rounded mb-3"
            >
                <option value="pro">Pro Plan</option>
                <option value="premium">Premium Plan</option>
            </select>

            <button
                onClick={handleActivate}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Start Free Trial
            </button>

            {message && (
                <p className="mt-3 text-green-600">{message}</p>
            )}
        </div>
    );
};

export default TrialBanner;


