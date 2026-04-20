import { useEffect, useState } from "react";
import { getClientCases } from "@/engines/client/client.engine";
import ClientCaseList from "@/components/client/clientCaseList";
import { useClientAuth } from "@/hooks/useClientAuth";
import { useRealtimeCases } from "@/hooks/useRealtimeCases";
import NotificationCenter from "@/components/ui/notification";

export default function ClientDashboard() {
    const { user, loading } = useClientAuth();

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">
                Welcome, {user?.email}
            </h1>
        </div>
    );
}

useRealtimeCases(user.id, (updatedCase: any) => {
    console.log("case updated:", updatedCase);

    // 🔔 notification
    alert(`Case status updated: ${updatedCase.status}`);
});

