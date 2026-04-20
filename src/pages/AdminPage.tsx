import { useAuth } from "../hooks/useAuth";

export default function AdminPage() {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    // 🔐 ROLE CHECK (simple version)
    if (!user || user.email !== "vk7332@gmail.com") {
        return (
            <div className="p-6 text-red-600 font-bold">
                Access Denied (Admin Only)
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Admin Dashboard
            </h1>

            <p>Welcome Admin</p>

            <div className="mt-4 border p-4">
                <p>Future Admin Controls:</p>
                <ul className="list-disc ml-4">
                    <li>User Management</li>
                    <li>Subscription Control</li>
                    <li>System Logs</li>
                </ul>
            </div>
        </div>
    );
}


