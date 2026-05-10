import { useState } from "react";
import { useClientAuth } from "@/hooks/useClientAuth";
import { supabase } from "@/utils/supabase/supabaseClient";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            window.location.href = "/dashboard";
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-6 bg-white shadow rounded w-96">
                <h2 className="text-xl font-bold mb-4">Login</h2>

                <select
                    className="border p-2 w-full mb-2"
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="advocate">Advocate</option>
                    <option value="client">Client</option>
                    <option value="litigant">Litigant</option>
                    <option value="public">Public</option>
                </select>

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full mb-2"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-4"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="bg-blue-600 text-white w-full py-2 rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
