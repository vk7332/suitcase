import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState<any>(null);
    const [cases, setCases] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const init = async () => {
            try {
                setLoading(true);

                const { data: { user: authUser } } = await supabase.auth.getUser();

                if (!authUser) {
                    navigate("/login");
                    return;
                }

                const { data: profile } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", authUser.id)
                    .single();

                setUser(authUser);

                let query = supabase.from("cases").select("*");
                
                if (profile?.organization_id) {
                    query = query.eq("organization_id", profile.organization_id);
                } else {
                    query = query.eq("user_id", authUser.id);
                }

                const { data: caseData, error: caseError } = await query;

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

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen"><p>Loading...</p></div>;

    if (error) return <div className="flex items-center justify-center min-h-screen"><p className="text-red-600">{error}</p></div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                    <p className="text-gray-500">{user?.email}</p>
                </div>

                <button 
                    onClick={handleLogout} 
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="text-gray-500 text-sm mb-1">Total Cases</h3>
                    <p className="text-3xl font-bold">{cases.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="text-gray-500 text-sm mb-1">Active Hearings</h3>
                    <p className="text-3xl font-bold">0</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="text-gray-500 text-sm mb-1">Pending Invoices</h3>
                    <p className="text-3xl font-bold">0</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-4 border-b">
                    <h3 className="font-bold">Recent Cases</h3>
                </div>
                <div className="p-4">
                    {cases.length === 0 ? (
                        <p className="text-gray-500 text-center py-10">No cases found. Start by adding a new case.</p>
                    ) : (
                        <ul className="divide-y">
                            {cases.map((c) => (
                                <li key={c.id} className="py-3 flex justify-between items-center">
                                    <span>{c.title}</span>
                                    <button 
                                        onClick={() => navigate(`/advocate/cases`)}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        View Details
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
