import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/utils/supabase/supabaseClient";

const PublicLoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            navigate("/dashboard");
        }

        setLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-lg bg-white p-6 shadow-md"
            >
                <h2 className="mb-2 text-center text-2xl font-bold">
                    SUITCASE Portal
                </h2>
                <p className="mb-4 text-center text-gray-600 text-sm">
                    Client • Litigant • Public Login
                </p>

                {error && (
                    <p className="mb-3 text-sm text-red-500">{error}</p>
                )}

                <input
                    type="email"
                    placeholder="Email Address"
                    className="mb-3 w-full rounded border p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="mb-4 w-full rounded border p-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Login to Portal"}
                </button>
            </form>
        </div>
    );
};

export default PublicLoginPage;


