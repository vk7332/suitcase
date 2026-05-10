import { supabase } from "@/utils/supabase/supabaseClient";
import { useState } from "react";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("client");

    const handleSignup = async () => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            alert(error.message);
            return;
        }

        const user = data.user;

        // ✅ ROLE INSERT (IMPORTANT)
        await supabase.from("profiles").insert({
            id: user?.id,
            email: email,
            role: role,
            subscription_status: "trial",
        });

        alert("Signup successful");
    };

    return (
        <div>
            <h2>Signup</h2>

            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

            <select onChange={(e) => setRole(e.target.value)}>
                <option value="client">Client</option>
                <option value="advocate">Advocate</option>
                <option value="admin">Admin</option>
            </select>

            <button onClick={handleSignup}>Signup</button>
        </div>
    );
}
