import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SubscriptionGuard({ children }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const check = async () => {
            const res = await fetch("/api/subscription/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!res.ok) {
                navigate("/pricing");
                return;
            }

            const data = await res.json();

            if (
                data.plan !== "free" &&
                data.status !== "active"
            ) {
                navigate("/pricing");
            }

            setLoading(false);
        };

        check();
    }, []);

    if (loading) return <p>Loading...</p>;

    return children;
}