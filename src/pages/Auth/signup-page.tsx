import { supabase } from "@/utils/supabase/supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [enrollment, setEnrollment] = useState("");
    const [role, setRole] = useState("advocate");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const rolesRequiringEnrollment = ["advocate", "junior advocates"];
    const isEnrollmentRequired = rolesRequiringEnrollment.includes(role);

    const handleSignup = async () => {
        if (!email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (isEnrollmentRequired && !enrollment) {
            alert("Enrollment Number is required for this role.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            // 🔍 Debug check for Supabase environment variables
            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
            const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
            if (!supabaseUrl || supabaseUrl.includes("placeholder") || !supabaseAnonKey || supabaseAnonKey.includes("placeholder")) {
                throw new Error(
                    "Supabase environment variables are not configured correctly. " +
                    "Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file and restart the dev server."
                );
            }

            // 🔐 1. Check if enrollment number already exists (only if provided)
            if (enrollment) {
                const { data: existingProfile, error: checkError } = await supabase
                    .from("profiles")
                    .select("id")
                    .or(`enrollment_number.eq.${enrollment},advocate_enrollment_number.eq.${enrollment}`)
                    .maybeSingle();

                if (checkError) {
                    console.warn("Check error (might be missing column, proceeding anyway):", checkError);
                }

                if (existingProfile) {
                    alert("An account with this enrollment number already exists");
                    navigate("/login");
                    return;
                }
            }

            // 🔐 2. Proceed with Supabase Auth Signup
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        role: role,
                        enrollment_number: enrollment || null
                    }
                }
            });

            if (error) throw error;

            if (!data.user) throw new Error("User creation failed");

            // 🔐 3. Create profile
            const profileData: any = {
                id: data.user.id,
                role: role,
                enrollment_number: enrollment || null,
                advocate_enrollment_number: enrollment || null, // Set both for compatibility
                subscription_plan: "free",
                trial_used: false,
            };

            const { error: profileError } = await supabase.from("profiles").insert(profileData);

            if (profileError) {
                console.error("Profile creation error:", profileError);
                // Even if profile fails, user is created in Auth.
            }

            alert("Signup successful! Please check your email for confirmation (if enabled) and then login.");
            navigate("/login");
        } catch (err: any) {
            console.error("Signup failed:", err);
            // More descriptive error handling
            let errorMessage = err.message || "Signup failed. Please try again.";
            if (errorMessage.toLowerCase().includes("fetch")) {
                errorMessage = "Network Error: Failed to reach the server. Please check your internet connection and Supabase configuration in .env";
            }
            alert(errorMessage);
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

                    {isEnrollmentRequired && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Enrollment Number</label>
                            <input 
                                placeholder="Enrollment Number" 
                                className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#089CCE] focus:border-transparent outline-none transition"
                                onChange={(e) => setEnrollment(e.target.value)} 
                            />
                            <p className="text-[10px] text-gray-400 mt-1 italic">Locked forever to your account.</p>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input 
                                placeholder="••••••••••••" 
                                type={showPassword ? "text" : "password"} 
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

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                        <div className="relative">
                            <input 
                                placeholder="••••••••••••" 
                                type={showConfirmPassword ? "text" : "password"} 
                                className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#089CCE] focus:border-transparent outline-none transition"
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
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
