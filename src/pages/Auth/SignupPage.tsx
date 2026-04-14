import { useState } from "react";
import { signUp } from "../../services/AuthService";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        await signUp(email, password);
        alert("Account Created");
    };

    return (
        <div className="p-10">
            <h2 className="text-xl mb-4">Sign Up</h2>

            <input
                type="email"
                placeholder="Email"
                className="border p-2 block mb-2"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                className="border p-2 block mb-2"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                onClick={handleSignup}
                className="bg-green-600 text-white p-2"
            >
                Sign Up
            </button>
        </div>
    );
}
