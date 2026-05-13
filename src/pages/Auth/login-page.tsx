import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/utils/supabase/supabaseClient";

export default function LoginPage() {
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("advocate");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }
        setLoading(true);
        try {
            await signIn(email, password);
            
            // Check profile for role-based redirect
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", user.id)
                    .single();
                
                if (profile?.role === "client") {
                    navigate("/client");
                } else if (profile?.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/dashboard");
                }
            }
        } catch (err: any) {
            alert(err.message || "Login failed");
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
                <h2 className="text-2xl font-bold mb-8 text-gray-900 text-center">Welcome Back</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Login as</label>
                        <select
                            value={role}
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
                            type="email"
                            placeholder="name@chamber.com"
                            className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#089CCE] focus:border-transparent outline-none transition"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#089CCE] focus:border-transparent outline-none transition"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="bg-[#089CCE] text-white w-full py-4 rounded-xl font-bold text-lg hover:bg-[#078bb8] transition shadow-lg shadow-[#089CCE]/20 disabled:opacity-50 mt-4"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-100"></span>
                        </div>
                        <div className="relative flex justify-center text-sm uppercase">
                            <span className="bg-white px-4 text-gray-400 font-medium">Or</span>
                        </div>
                    </div>

                    <button
                        onClick={async () => {
                            setLoading(true);
                            try {
                                await signIn("demo@suitcase.com", "demo123");
                                navigate("/dashboard");
                            } catch (err: any) {
                                alert("Demo login currently unavailable. Please sign up for a free account.");
                            } finally {
                                setLoading(false);
                            }
                        }}
                        disabled={loading}
                        className="w-full py-4 rounded-xl font-bold text-lg border-2 border-[#089CCE] text-[#089CCE] hover:bg-blue-50 transition flex items-center justify-center gap-2"
                    >
                        <span>🚀</span> {loading ? "Starting Demo..." : "Try Live Demo"}
                    </button>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-white/80 font-medium mb-4">Don't have an account?</p>
                <button
                    onClick={() => navigate("/signup")}
                    className="bg-white text-[#089CCE] px-10 py-3 rounded-xl font-bold hover:bg-blue-50 transition shadow-xl"
                >
                    Sign Up
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
