import { useState } from "react";
import { supabase } from "@/utils/supabase/supabase-client";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password reset link sent. Please check your email.");

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#089CCE]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-[#089CCE] text-white py-3 rounded-xl"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>
    </div>
  );
}
