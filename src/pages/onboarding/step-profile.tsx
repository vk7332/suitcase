import { useState } from "react";
import { activateTrial } from "@/services/trialService";
import { supabase } from "@/utils/supabase/supabaseClient";

export default function StepProfile({ next }: any) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [enrollment, setEnrollment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleContinue = async () => {
        if (!name || !phone || !enrollment) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No user found");

            // Activate trial and check for existing enrollment
            await activateTrial(user.id, enrollment, "pro");

            next({ name, phone, enrollment });
        } catch (err: any) {
            console.error(err);
            if (err.message === "You already have an account") {
                setError("You already have an account. Redirecting...");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            } else {
                setError(err.message || "Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Profile</h2>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        placeholder="Advocate Name"
                        className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#089CCE] focus:border-transparent outline-none transition"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <input
                        placeholder="+91 00000 00000"
                        className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#089CCE] focus:border-transparent outline-none transition"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Number</label>
                    <input
                        placeholder="e.g. P/1234/2024"
                        className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#089CCE] focus:border-transparent outline-none transition"
                        onChange={(e) => setEnrollment(e.target.value)}
                        value={enrollment}
                    />
                    <p className="text-xs text-gray-500 mt-1">This will be locked to your account forever.</p>
                </div>

                <button
                    onClick={handleContinue}
                    disabled={loading}
                    className="w-full bg-[#089CCE] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#078bb8] transition shadow-lg shadow-[#089CCE]/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                    {loading ? "Processing..." : "Continue"}
                </button>
            </div>
        </div>
    );
}
