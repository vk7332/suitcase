import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase/supabaseclient";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            setLoading(true);

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
                return;
            }

            // ✅ SUCCESS
            console.log("Logged in user:", data.user);

            navigate("/dashboard");

        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Login</h2>

                <form onSubmit={handleLogin} style={styles.form}>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />

                    {error && <p style={styles.error}>{error}</p>}

                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p style={{ marginTop: "1rem" }}>
                    Don’t have an account?{" "}
                    <span
                        style={styles.link}
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
}

// ---------------- STYLES ----------------

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
    },
    card: {
        padding: "2rem",
        borderRadius: "8px",
        background: "#fff",
        width: "320px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginTop: "1rem",
    },
    input: {
        padding: "0.6rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "0.7rem",
        border: "none",
        borderRadius: "4px",
        background: "#007bff",
        color: "#fff",
        cursor: "pointer",
    },
    error: {
        color: "red",
        fontSize: "0.9rem",
    },
    link: {
        color: "#007bff",
        cursor: "pointer",
    },
};