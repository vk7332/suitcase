import { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../utils/supabase/supabaseclient";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState<any>(null);
    const [cases, setCases] = useState<Case[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    axios.get("/api/dashboard", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // =========================
    // FETCH USER + CASES
    // =========================
    useEffect(() => {
        const init = async () => {
            try {
                setLoading(true);

                // 🔐 get logged-in user
                const { data: { user: authUser } } = await supabase.auth.getUser();
                console.log("ROLE:", profile.role);
                console.log("ORG:", profile.organization_id);

                if (!authUser) {
                    navigate("/login");
                    return;
                }

                const { data: profile } = await supabase
                    .from("users")
                    .select("*")
                    .eq("id", authUser.id)
                    .single();

                setUser(authUser);

                // 📂 fetch cases (temporary without org filter)
                const { data: caseData, error: caseError } = await supabase
                    .from("cases")
                    .select("*")
                    .eq("organization_id", profile.organization_id);

                if (caseError) {
                    setError(caseError.message);
                } else {
                    setCases(caseData || []);
                }

            } catch (err) {
                console.error(err);
                setError("Failed to load dashboard");
            } finally {
                setLoading(false);
            }
        };

        init();
    }, [navigate]);

    // =========================
    // LOGOUT
    // =========================
    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    // =========================
    // UI STATES
    // =========================
    if (loading) return <p style={styles.center}>Loading...</p>;

    if (error) return <p style={styles.error}>{error}</p>;

    // =========================
    // MAIN UI
    // =========================
    return (
        <div style={styles.container}>
            {/* HEADER */}
            <div style={styles.header}>
                <div>
                    <h2>Dashboard</h2>
                    <p>{user?.email}</p>
                </div>

                <button onClick={handleLogout} style={styles.logout}>
                    Logout
                </button>
            </div>

            {/* STATS */}
            <div style={styles.stats}>
                <div style={styles.card}>
                    <h3>Total Cases</h3>
                    <p>{cases.length}</p>
                </div>

                <div style={styles.card}>
                    <h3>Active Cases</h3>
                    <p>{cases.filter(c => c.status === "active").length}</p>
                </div>

                <div style={styles.card}>
                    <h3>Closed Cases</h3>
                    <p>{cases.filter(c => c.status === "closed").length}</p>
                </div>
            </div>

            {/* RECENT CASES */}
            <div style={styles.section}>
                <h3>Recent Cases</h3>

                {cases.length === 0 ? (
                    <p>No cases found</p>
                ) : (
                    <ul style={styles.list}>
                        {cases.slice(0, 5).map((c) => (
                            <li key={c.id} style={styles.listItem}>
                                <div>
                                    <strong>{c.case_title}</strong>
                                    <p style={styles.meta}>{c.status}</p>
                                </div>
                                <span style={styles.meta}>
                                    {new Date(c.created_at).toLocaleDateString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

// =========================
// STYLES
// =========================
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: "2rem",
        fontFamily: "sans-serif",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logout: {
        padding: "0.5rem 1rem",
        background: "#dc3545",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    },
    stats: {
        display: "flex",
        gap: "1rem",
        marginTop: "2rem",
    },
    card: {
        padding: "1rem",
        background: "#f5f5f5",
        borderRadius: "6px",
        flex: 1,
    },
    section: {
        marginTop: "2rem",
    },
    list: {
        listStyle: "none",
        padding: 0,
    },
    listItem: {
        display: "flex",
        justifyContent: "space-between",
        padding: "0.8rem",
        borderBottom: "1px solid #ddd",
    },
    meta: {
        fontSize: "0.85rem",
        color: "#666",
    },
    center: {
        textAlign: "center",
        marginTop: "2rem",
    },
    error: {
        color: "red",
        textAlign: "center",
    },
};