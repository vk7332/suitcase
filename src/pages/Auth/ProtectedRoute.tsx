import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/AuthService";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkUser() {
            const u = await getCurrentUser();
            setUser(u);
            setLoading(false);
        }
        checkUser();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (!user) return <Navigate to="/login" />;

    return children;
}
