import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { supabase } from "@/utils/supabase/supabase-client";

import DashboardLayout from "@/components/layout/DashboardLayout";

import CaseTimeline from "@/components/cases/CaseTimeline";
import DocumentUploader from "@/components/documents/DocumentUploader";
import EditCaseModal from "@/components/cases/EditCaseModal";
import CaseStatusBadge from "@/components/cases/CaseStatusBadge";

import { sendWhatsAppReminder } from "@/utils/whatsapp";
import { sendEmailReminder } from "@/utils/email";
import { addToGoogleCalendar } from "@/utils/google-calendar";
import { openECourt } from "@/utils/ecourts";

import { sendWhatsAppAPI } from "@/services/whats-app-service";

export default function CaseDetailsPage() {
    const { id } = useParams<{ id: string }>();

    const [caseData, setCaseData] = useState<any>(null);
    const [client, setClient] = useState<any>(null);

    const [loading, setLoading] = useState(true);
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        if (!id) return;
        loadCase();
    }, [id]);

    if (!id) {
        return (
            <DashboardLayout>
                <div className="p-10">
                    Invalid case ID.
                </div>
            </DashboardLayout>
        );
    }

    const loadCase = async () => {
        if (!id) return;

        try {
            setLoading(true);

            const { data, error } = await supabase
                .from("cases")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;

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
                <div className="p-10">
                    Loading case...
                </div>
            </DashboardLayout>
        );
    }

    if (!caseData) {
        return (
            <DashboardLayout>
                <div className="p-10">
                    Case not found.
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>

            <div className="max-w-7xl mx-auto p-6 space-y-6">

                {/* HEADER */}

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                        <div>

                            <div className="flex items-center gap-3 mb-4">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {caseData.case_title}
                                </h1>

                                <CaseStatusBadge
                                    status={caseData.status}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

                                <div>
                                    <p className="text-gray-500">
                                        Case Number
                                    </p>

                                    <p className="font-semibold">
                                        {caseData.case_number || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Court
                                    </p>

                                    <p className="font-semibold">
                                        {caseData.court_name || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Case Stage
                                    </p>

                                    <p className="font-semibold">
                                        {caseData.case_stage || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Priority
                                    </p>

                                    <p className="font-semibold capitalize">
                                        {caseData.priority || "normal"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Next Hearing
                                    </p>

                                    <p className="font-semibold">
                                        {caseData.next_hearing_date
                                            ? new Date(
                                                caseData.next_hearing_date
                                            ).toLocaleDateString()
                                            : "-"}
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="flex flex-wrap gap-3">

                            <button
                                onClick={() => setShowEdit(true)}
                                className="bg-[#089CCE] text-white px-5 py-3 rounded-2xl font-semibold hover:bg-[#078bb8]"
                            >
                                Edit Case
                            </button>

                            <button
                                onClick={() => openECourt()}
                                className="bg-gray-800 text-white px-5 py-3 rounded-2xl font-semibold"
                            >
                                eCourts
                            </button>

                        </div>

                    </div>

                    {caseData.description && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <p className="text-gray-700 leading-relaxed">
                                {caseData.description}
                            </p>
                        </div>
                    )}

                </div>

                {/* CLIENT + ACTIONS */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* CLIENT */}

                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

                        <h2 className="text-xl font-bold mb-4">
                            Client Information
                        </h2>

                        {client ? (
                            <div className="space-y-3 text-sm">

                                <div>
                                    <p className="text-gray-500">
                                        Name
                                    </p>

                                    <p className="font-semibold">
                                        {client.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Phone
                                    </p>

                                    <p className="font-semibold">
                                        {client.phone || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Email
                                    </p>

                                    <p className="font-semibold">
                                        {client.email || "-"}
                                    </p>
                                </div>

                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">
                                No client linked yet.
                            </p>
                        )}

                    </div>

                    {/* ACTIONS */}

                    <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

                        <h2 className="text-xl font-bold mb-5">
                            Quick Actions
                        </h2>

                        <div className="flex flex-wrap gap-3">

                            {client && (
                                <>
                                    <button
                                        onClick={() =>
                                            sendWhatsAppReminder(
                                                caseData,
                                                client
                                            )
                                        }
                                        className="bg-green-600 text-white px-4 py-3 rounded-2xl font-semibold"
                                    >
                                        WhatsApp Reminder
                                    </button>

                                    <button
                                        onClick={() =>
                                            sendWhatsAppAPI({
                                                to: client.phone,
                                                message: `⚖️ Reminder:
Case: ${caseData.case_title}
Next Date: ${caseData.next_hearing_date || "-"
                                                    }`,
                                            })
                                        }
                                        className="bg-green-700 text-white px-4 py-3 rounded-2xl font-semibold"
                                    >
                                        Auto WhatsApp
                                    </button>

                                    <button
                                        onClick={() =>
                                            sendEmailReminder(
                                                caseData,
                                                client
                                            )
                                        }
                                        className="bg-blue-600 text-white px-4 py-3 rounded-2xl font-semibold"
                                    >
                                        Email Reminder
                                    </button>
                                </>
                            )}

                            <button
                                onClick={() =>
                                    addToGoogleCalendar(caseData)
                                }
                                className="bg-purple-600 text-white px-4 py-3 rounded-2xl font-semibold"
                            >
                                Add To Calendar
                            </button>

                        </div>

                    </div>

                </div>

                {/* DOCUMENTS */}

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

                    <DocumentUploader caseId={id} />

                </div>

                {/* TIMELINE */}

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

                    <CaseTimeline caseId={id} />

                </div>

            </div>

            {showEdit && (
                <EditCaseModal
                    caseData={caseData}
                    onClose={() => setShowEdit(false)}
                    onUpdated={loadCase}
                />
            )}

        </DashboardLayout>
    );
}