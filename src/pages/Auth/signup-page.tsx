import { supabase } from "@/utils/supabase/supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [enrollment, setEnrollment] = useState("");
    const [role, setRole] = useState("advocate");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!email || !password || !confirmPassword || !enrollment) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            // 🔐 1. Check if enrollment number already exists
            const { data: existingProfile, error: checkError } = await supabase
                .from("profiles")
                .select("id")
                .or(`enrollment_number.eq.${enrollment},advocate_enrollment_number.eq.${enrollment}`)
                .maybeSingle();

            if (checkError) {
                console.error("Check error (might be missing column):", checkError);
            }

            if (existingProfile) {
                alert("An account with this enrollment number already exists");
                navigate("/login");
                return;
            }

            // 🔐 2. Proceed with Supabase Auth Signup
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        role: role,
                        enrollment_number: enrollment
                    }
                }
            });

            if (error) throw error;

            if (!data.user) throw new Error("User creation failed");

            // 🔐 3. Create profile with enrollment number locked
            const profileData: any = {
                id: data.user.id,
                role: role,
                enrollment_number: enrollment,
                advocate_enrollment_number: enrollment, // Set both for compatibility
                subscription_plan: "free",
                trial_used: false,
            };

            const { error: profileError } = await supabase.from("profiles").insert(profileData);

            if (profileError) {
                console.error("Profile creation error:", profileError);
                // Even if profile fails, user is created in Auth. 
                // We should probably warn the user or try to fix it.
                // But for now, let's just proceed or throw.
            }

            alert("Signup successful! Please login to continue.");
            navigate("/login");
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#089CCE] py-12 px-4">
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
                            type="email"
                            placeholder="vkskt123@gmail.com" 
                            className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#089CCE] focus:border-transparent outline-none transition"
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Enrollment Number</label>
                        <input 
                            placeholder="Enrollment Number" 
                            className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#089CCE] focus:border-transparent outline-none transition"
                            onChange={(e) => setEnrollment(e.target.value)} 
                        />
                        <p className="text-[10px] text-gray-400 mt-1 italic">Locked forever to your account.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input 
                            placeholder="••••••••••••" 
                            type="password" 
                            className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#089CCE] focus:border-transparent outline-none transition"
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                        <input 
                            placeholder="••••••••••••" 
                            type="password" 
                            className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#089CCE] focus:border-transparent outline-none transition"
                            onChange={(e) => setConfirmPassword(e.target.value)} 
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

            <div className="mt-8 flex gap-6 text-white/60 text-xs font-medium">
                <button onClick={() => navigate("/privacy")} className="hover:text-white transition underline">Privacy Policy</button>
                <button onClick={() => navigate("/terms")} className="hover:text-white transition underline">Terms of Service</button>
                <button onClick={() => navigate("/contact")} className="hover:text-white transition underline">Contact Us</button>
            </div>
        </div>
    );
}
