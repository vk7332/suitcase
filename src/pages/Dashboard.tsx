import { useEffect, useState } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/utils/supabase/supabaseclient";
import { useNavigate } from "react-router-dom";
import EmptyState from "@/components/ui/empty-state";
import Skeleton from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/ui/error-boundary";
import { useCases } from "@/hooks/useCases";


export default function Dashboard() {
    const { cases, loading } = useCases();
    const navigate = useNavigate();

    export default function Dashboard() {
        const { plan } = useSubscription();
        const [cases, setCases] = useState<any[]>([]);
        const navigate = useNavigate();

        useEffect(() => {
            const fetchCases = async () => {
                const { data } = await supabase.from("cases").select("*");
                setCases(data || []);
            };

            fetchCases();
        }, []);

        const caseLimit = plan === "free" ? 5 : plan === "pro" ? 30 : Infinity;

        return (
            <ErrorBoundary>
                <div className="p-6">

                    <h1 className="text-2xl font-bold mb-6">
                        Dashboard
                    </h1>

                    {/* LOADING */}
                    {loading && (
                        <div className="space-y-3">
                            <Skeleton height="h-6" />
                            <Skeleton height="h-6" />
                            <Skeleton height="h-6" />
                        </div>
                    )}

                    {/* EMPTY */}
                    {!loading && cases.length === 0 && (
                        <EmptyState
                            title="No cases yet"
                            description="Create your first case to get started"
                            actionLabel="Create Case"
                            onAction={() => navigate("/cases/new")}
                        />
                    )}

                    {/* DATA */}
                    {!loading && cases.length > 0 && (
                        <div className="space-y-2">
                            {cases.map((c) => (
                                <div key={c.id} className="border p-3 rounded">
                                    {c.title}
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </ErrorBoundary>
        );
    }
    <div className="p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            <button
                onClick={() => navigate("/cases/new")}
                className="bg-black text-white px-4 py-2 rounded"
            >
                + New Case
            </button>
        </div>

        {/* ANALYTICS */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">

            <div className="border p-4 rounded">
                <h3 className="text-sm text-gray-500">Total Cases</h3>
                <p className="text-xl font-bold">{cases.length}</p>
            </div>

            <div className="border p-4 rounded">
                <h3 className="text-sm text-gray-500">Plan</h3>
                <p className="text-xl font-bold capitalize">{plan}</p>
            </div>

            <div className="border p-4 rounded">
                <h3 className="text-sm text-gray-500">Usage</h3>
                <p className="text-xl font-bold">
                    {cases.length} / {caseLimit === Infinity ? "∞" : caseLimit}
                </p>
            </div>

        </div>

        {/* UPGRADE PROMPT */}
        {plan !== "premium" && cases.length >= caseLimit - 2 && (
            <div className="border p-4 mb-6 bg-yellow-50 rounded">

                <p className="mb-2">
                    You're close to your limit. Upgrade for more cases and features.
                </p>

                <button
                    onClick={() => navigate("/pricing")}
                    className="bg-black text-white px-4 py-2"
                >
                    Upgrade Now
                </button>

            </div>
        )}

        {/* QUICK ACTIONS */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">

            <button
                onClick={() => navigate("/calculator/court-fee")}
                className="border p-4 rounded"
            >
                ⚖️ Calculate Court Fee
            </button>

            <button
                onClick={() => navigate("/documents")}
                className="border p-4 rounded"
            >
                📄 Upload Document
            </button>

            <button
                onClick={() => navigate("/clients")}
                className="border p-4 rounded"
            >
                👥 Manage Clients
            </button>

        </div>

        {/* CASE LIST */}
        <div>
            <h2 className="text-lg font-semibold mb-2">
                Recent Cases
            </h2>

            {cases.length === 0 ? (
                <p className="text-gray-500">
                    No cases yet. Create your first case.
                </p>
            ) : (
                <div className="space-y-2">
                    {cases.slice(0, 5).map((c) => (
                        <div
                            key={c.id}
                            className="border p-3 rounded flex justify-between"
                        >
                            <span>{c.title}</span>
                            <span className="text-sm text-gray-500">
                                {c.status}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>

    </div>
    );
}