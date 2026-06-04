import { useState } from "react";
import { supabase } from "@/utils/supabase/supabase-client";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] =
useState("");

const navigate = useNavigate();

const handleUpdate = async () => {
if (password.length < 8) {
    alert("Password must be at least 8 characters.");
    return;
}

if (!/[A-Z]/.test(password)) {
    alert("Password must contain at least one uppercase letter.");
    return;
}

if (!/[0-9]/.test(password)) {
    alert("Password must contain at least one number.");
    return;
}

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const { error } = await supabase.auth.updateUser({
        password
    });

    if (error) {
        alert(error.message);
        return;
    }

    alert("Password updated successfully.");
    navigate("/login");
};
return (
    <div className="min-h-screen flex items-center justify-center bg-[#089CCE]">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6">
                Reset Password
            </h1>

            <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                className="w-full border p-3 rounded-xl mb-4"
            />

            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                    setConfirmPassword(
                        e.target.value
                    )
                }
                className="w-full border p-3 rounded-xl mb-4"
            />

            <button
                onClick={handleUpdate}
                className="w-full bg-[#089CCE] text-white py-3 rounded-xl"
            >
                Update Password
            </button>
        </div>
    </div>
);
}
