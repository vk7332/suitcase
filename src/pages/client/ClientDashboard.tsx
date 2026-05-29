import { useEffect, useState } from "react";
import { getClientCases } from "@/engines/client/client-engine.ts";
import ClientCaseList from "@/components/client/ClientCaseList";
import { useClientAuth } from "@/hooks/use-client-auth";
import { useRealtimeCases } from "@/hooks/use-realtime-cases";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ClientDashboard() {
    const { user, loading } = useClientAuth();

    useRealtimeCases(user?.id, (updatedCase: any) => {
        console.log("case updated:", updatedCase);
        alert(`Case status updated: ${updatedCase.status}`);
    });

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#089CCE] mb-4"></div>
            <p className="text-gray-600 font-medium">Loading Client Portal...</p>
        </div>
    );

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Client Portal</h1>
                <p className="text-gray-500 mt-1">Welcome back, {user?.email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">My Active Cases</h3>
                    <p className="text-3xl font-bold text-gray-900">0</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Next Hearing</h3>
                    <p className="text-lg font-bold text-gray-900">None Scheduled</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Unpaid Invoices</h3>
                    <p className="text-3xl font-bold text-[#089CCE]">₹0</p>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50">
                    <h3 className="font-bold text-gray-900">My Cases</h3>
                </div>
                <div className="p-10 text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#089CCE]">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                    </div>
                    <p className="text-gray-500 font-medium">No active cases linked to your account yet.</p>
                    <p className="text-sm text-gray-400 mt-1">Please contact your advocate to link your files.</p>
                </div>
            </div>
        </DashboardLayout>
    );
}

