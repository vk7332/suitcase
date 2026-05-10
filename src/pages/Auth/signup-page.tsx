import { supabase } from "@/utils/supabase/supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("advocate");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) throw error;

            const user = data.user;

            // ✅ ROLE INSERT (IMPORTANT)
            await supabase.from("profiles").insert({
                id: user?.id,
                email: email,
                role: role,
                subscription_plan: "free",
                trial_used: false,
            });

            alert("Signup successful! Please check your email for verification.");
            navigate("/login");
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#089CCE]">
            <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                    <span className="text-[#089CCE] font-black text-3xl">S</span>
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">SUITCASE</h1>
            </div>

            <div className="p-10 bg-white shadow-2xl rounded-[2.5rem] w-full max-w-md border border-white/20">
                <h2 className="text-2xl font-bold mb-8 text-gray-900 text-center">Create Account</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Select Role</label>
                        <select 
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#089CCE] focus:border-transparent outline-none transition bg-gray-50"
                        >
                            <option value="advocate">Advocate</option>
                            <option value="admin">Admin</option>
                            <option value="junior advocates">Junior Advocate</option>
                            <option value="staff(clerks)">Staff / Clerk</option>
                            <option value="client">Client</option>
                            <option value="litigant">Litigant</option>
                            <option value="public">Public</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                        <input 
                            placeholder="name@chamber.com" 
                            className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#089CCE] focus:border-transparent outline-none transition"
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input 
                            placeholder="••••••••" 
                            type="password" 
                            className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#089CCE] focus:border-transparent outline-none transition"
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    <button 
                        onClick={handleSignup}
                        disabled={loading}
                        className="bg-[#089CCE] text-white w-full py-4 rounded-xl font-bold text-lg hover:bg-[#078bb8] transition shadow-lg shadow-[#089CCE]/20 disabled:opacity-50 mt-4"
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-white/80 font-medium mb-4">Already have an account?</p>
                <button
                    onClick={() => navigate("/login")}
                    className="bg-white text-[#089CCE] px-10 py-3 rounded-xl font-bold hover:bg-blue-50 transition shadow-xl"
                >
                    Login
                </button>
            </div>

            <button 
                onClick={() => navigate("/")}
                className="mt-8 text-white/60 hover:text-white transition text-sm font-medium"
            >
                ← Back to Homepage
            </button>
        </div>
    );
}
