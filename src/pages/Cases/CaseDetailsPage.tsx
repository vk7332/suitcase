import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { supabase } from "@/utils/supabase/supabase-client";

import CaseTimeline from "@/components/cases/CaseTimeline";
import DocumentUploader from "@/components/documents/DocumentUploader";

import { sendWhatsAppReminder } from "@/utils/whatsapp";
import { sendEmailReminder } from "@/utils/email";
import { addToGoogleCalendar } from "@/utils/google-calendar";
import { openECourt } from "@/utils/ecourts";

import { sendWhatsAppAPI } from "@/services/whats-app-service";

export default function CaseDetailsPage() {
    const { id } = useParams();

    const [caseData, setCaseData] = useState<any>(null);
    const [client, setClient] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadCase();
        }
    }, [id]);

    if (!id) {
        return (
            <DashboardLayout>
                <div className="p-8">
                    <div className="bg-white border border-red-100 rounded-3xl p-10 shadow-sm">
                        <h2 className="text-2xl font-bold text-red-600">
                            Case not found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            This litigation matter does not exist or was removed.
                        </p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    const loadCase = async () => {
        try {
            setLoading(true);

            const { data, error } = await supabase
                .from("cases")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                console.error(error);
                return;
            }

            setCaseData(data);

            if (data?.client_id) {
                const { data: clientData } = await supabase
                    .from("clients")
                    .select("*")
                    .eq("id", data.client_id)
                    .single();

                setClient(clientData);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="p-8">
                    Loading case details...
                </div>
            </DashboardLayout>
        );
    }

    if (!caseData) {
        return (
            <DashboardLayout>
                <div className="p-8">
                    <div className="bg-white border border-red-100 rounded-3xl p-10 shadow-sm">
                        <h2 className="text-2xl font-bold text-red-600">
                            Case not found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            This litigation matter does not exist or was removed.
                        </p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto p-6 space-y-6">

                {/* PAGE HEADER */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-14 h-14 rounded-2xl bg-[#089CCE]/10 flex items-center justify-center text-2xl">
                                    ⚖️
                                </div>

                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {caseData.case_title || caseData.title}
                                    </h1>

                                    <p className="text-gray-500 mt-1">
                                        Case No: {caseData.case_number || "-"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-4">

                                <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-semibold">
                                    Status: {caseData.status || "active"}
                                </div>

                                <div className="px-4 py-2 bg-purple-50 text-purple-700 rounded-xl text-sm font-semibold">
                                    Court: {caseData.court_name || "-"}
                                </div>

                                <div className="px-4 py-2 bg-green-50 text-green-700 rounded-xl text-sm font-semibold">
                                    Next Date:{" "}
                                    {caseData.next_date
                                        ? new Date(caseData.next_date).toLocaleDateString()
                                        : "Not Scheduled"}
                                </div>

                            </div>
                        </div>

                        {/* ACTIONS */}
                        {client && (
                            <div className="flex flex-wrap gap-3">

                                <button
                                    onClick={() =>
                                        sendWhatsAppReminder(caseData, client)
                                    }
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-2xl font-semibold transition"
                                >
                                    📲 WhatsApp
                                </button>

                                <button
                                    onClick={() =>
                                        sendWhatsAppAPI({
                                            to: client.phone,
                                            message: `⚖️ Reminder:
Case: ${caseData.case_title || caseData.title}
Next Date: ${
    caseData.next_date
        ? new Date(caseData.next_date).toLocaleDateString()
        : "-"
}`,
                                        })
                                    }
                                    className="bg-green-700 hover:bg-green-800 text-white px-4 py-3 rounded-2xl font-semibold transition"
                                >
                                    🚀 Auto WhatsApp
                                </button>

                                <button
                                    onClick={() =>
                                        sendEmailReminder(caseData, client)
                                    }
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-2xl font-semibold transition"
                                >
                                    📧 Email
                                </button>

                                <button
                                    onClick={() =>
                                        addToGoogleCalendar(caseData)
                                    }
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-2xl font-semibold transition"
                                >
                                    📅 Calendar
                                </button>

                                <button
                                    onClick={() =>
                                        openECourt()
                                    }
                                    className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-3 rounded-2xl font-semibold transition"
                                >
                                    🏛️ eCourts
                                </button>

                            </div>
                        )}

                    </div>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* LEFT COLUMN */}
                    <div className="xl:col-span-2 space-y-6">

                        {/* CASE INFORMATION */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Case Information
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">

                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Case Title
                                    </p>

                                    <p className="font-semibold text-gray-900">
                                        {caseData.case_title || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Case Number
                                    </p>

                                    <p className="font-semibold text-gray-900">
                                        {caseData.case_number || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Court Name
                                    </p>

                                    <p className="font-semibold text-gray-900">
                                        {caseData.court_name || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Status
                                    </p>

                                    <p className="font-semibold text-gray-900 capitalize">
                                        {caseData.status || "-"}
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* DOCUMENTS */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Documents
                            </h2>

                            <DocumentUploader caseId={id} />
                        </div>

                        {/* TIMELINE */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Case Timeline
                            </h2>

                            <CaseTimeline caseId={id} />
                        </div>

                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-6">

                        {/* CLIENT CARD */}
                        {client && (
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-[#089CCE]/10 flex items-center justify-center text-2xl">
                                        👤
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            {client.name}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Client Information
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">

                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">
                                            Phone
                                        </p>

                                        <p className="font-medium text-gray-900">
                                            {client.phone || "-"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">
                                            Email
                                        </p>

                                        <p className="font-medium text-gray-900 break-all">
                                            {client.email || "-"}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        )}

                        {/* QUICK SUMMARY */}
                        <div className="bg-gradient-to-br from-[#089CCE] to-cyan-500 rounded-3xl text-white p-8 shadow-xl">

                            <h2 className="text-2xl font-bold mb-4">
                                Litigation Workspace
                            </h2>

                            <p className="text-white/90 leading-relaxed">
                                Manage hearings, documents, reminders,
                                timelines, client communication,
                                and legal workflow from one place.
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </DashboardLayout>
    );
}