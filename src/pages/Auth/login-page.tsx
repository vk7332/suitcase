import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/utils/supabase/supabaseClient";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("advocate");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#089CCE] relative">
            <div className="absolute top-8 left-8">
                <button 
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition font-bold text-[#089CCE]"
                >
                    <div className="w-6 h-6 bg-[#089CCE] rounded flex items-center justify-center text-white text-xs">S</div>
                    SUITCASE
                </button>
            </div>

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
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#089CCE] focus:border-transparent outline-none transition"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="bg-[#089CCE] text-white w-full py-4 rounded-xl font-bold text-lg hover:bg-[#078bb8] transition shadow-lg shadow-[#089CCE]/20 disabled:opacity-50 mt-4"
                    >
                        {loading ? "Logging in..." : "Login"}
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
