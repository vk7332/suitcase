import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/utils/supabase/supabaseClient";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (data.user) {
            await supabase.from("users").insert([
                {
                    id: data.user.id,
                    email: data.user.email,
                    role: "admin", // first user = admin
                },
            ]);
        }

        if (error) {
            console.error(error);
            alert(JSON.stringify(error));
        }

        // 🔁 after signup → onboarding
        navigate("/create-chamber");
    };

    return (
        <div className="p-10 max-w-md mx-auto">
            <h1 className="text-2xl mb-4">Signup</h1>

            <input
                type="email"
                placeholder="Email"
                className="border p-2 w-full mb-3"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                className="border p-2 w-full mb-3"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                onClick={handleSignup}
                className="bg-blue-600 text-white px-4 py-2 w-full"
            >
                Signup
            </button>
        </div>
    );
}
