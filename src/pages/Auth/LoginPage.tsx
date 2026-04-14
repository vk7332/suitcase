import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // 🔐 LOGIN
    const handleLogin = async () => {
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            alert(error.message);
        } else {
            navigate("/dashboard");
        }
    };

    // 🆕 SIGNUP
    const handleSignup = async () => {
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            alert(error.message);
            return;
        }

        // 🧠 CREATE PROFILE (VERY IMPORTANT)
        if (data.user) {
            await supabase.from("profiles").insert([
                {
                    id: data.user.id,
                    role: "ADVOCATE",
                },
            ]);
        }

        alert("Signup successful. Check email.");
    };

    return (
        <div className="flex justify-center items-center h-screen">

            <div className="border p-6 w-80">

                <h2 className="text-lg font-bold mb-4">
                    Login / Signup
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full mb-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="bg-blue-600 text-white p-2 w-full mb-2"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Login"}
                </button>

                <button
                    onClick={handleSignup}
                    className="bg-green-600 text-white p-2 w-full"
                    disabled={loading}
                >
                    Signup
                </button>

            </div>

        </div>
    );
}
