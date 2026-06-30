import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { supabase } from "@/utils/supabase/supabase-client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CaseStatusBadge from "@/components/cases/CaseStatusBadge";
import {
    searchByCNR,
    openCaseStatusSearch
} from "@/utils/ecourts";
import CaseTimeline from "@/components/cases/CaseTimeline";
import HearingsList from "@/components/hearings/HearingsList";
import HearingAnalyticsCard from "@/components/hearings/HearingAnalyticsCard";
import HearingAuditTrail from "@/components/hearings/HearingAuditTrail";
import DocumentUploader from "@/components/documents/DocumentUploader";

import { sendWhatsAppReminder } from "@/utils/whatsapp";
import { sendEmailReminder } from "@/utils/email";
import { addToGoogleCalendar } from "@/utils/google-calendar";
import { openECourt } from "@/utils/ecourts";

import { sendWhatsAppAPI } from "@/services/whats-app-service";
import { formatDate } from "@/utils/date-formatter";

export default function CaseDetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [caseData, setCaseData] = useState<any>(null);
    const [client, setClient] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const loadCase = useCallback(
        async (showLoading = false) => {
            if (!id) return;

            try {
                if (showLoading) {
                    setLoading(true);
                }

                const { data, error } = await supabase
                    .from("cases")
                    .select(`
                        *,
                        clients (
                            id,
                            client_name,
                            phone_number,
                            email,
                            address
                        )
                    `)
                    .eq("id", id)
                    .single();

                if (error) throw error;

                setCaseData(data);

                if (data?.client_id) {
                    const { data: clientData, error: clientError } = await supabase
                        .from("clients")
                        .select("*")
                        .eq("id", data.client_id)
                        .single();

                    if (clientError) throw clientError;
                    setClient(clientData);
                } else {
                    setClient(null);
                }
            } catch (err) {
                console.error(err);
                setCaseData(null);
                setClient(null);
            } finally {
                if (showLoading) {
                    setLoading(false);
                }
            }
        },
        [id]
    );

    useEffect(() => {
        void loadCase(true);
    }, [loadCase]);

    useEffect(() => {
        if (!id) return;

        const channel = supabase
            .channel(`case-details-${id}`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "cases",
                    filter: `id=eq.${id}`,
                },
                () => {
                    void loadCase();
                }
            )
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "hearings",
                    filter: `case_id=eq.${id}`,
                },
                () => {
                    void loadCase();
                }
            )
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "hearing_audit_logs",
                    filter: `case_id=eq.${id}`,
                },
                () => {
                    void loadCase();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [id, loadCase]);

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

                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">  </div>

{/* =========================
   STATUS BANNER
========================= */}

<div
    className={`
        w-full
        rounded-xl
        overflow-hidden
        shadow-md
        border
        mb-6
        ${
            caseData.status === "disposed"
                ? "bg-gradient-to-r from-red-700 via-red-600 to-red-700 border-red-300 text-white"
                : "bg-gradient-to-r from-green-700 via-green-600 to-green-700 border-green-300 text-white"
        }
    `}
>
    <div className="grid grid-cols-12 items-center min-h-[110px]">

        {/* Left Icon */}

        <div className="col-span-2 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow">
                <span className="text-3xl">
                    {caseData.status === "disposed" ? "⚖️" : "✅"}
                </span>
            </div>
        </div>

        {/* Middle */}

        <div className="col-span-6">
            <h1 className="text-3xl font-extrabold tracking-wide">
                {caseData.status === "disposed"
                    ? "DISPOSED"
                    : "ACTIVE"}
            </h1>

            <p className="text-xl font-semibold mt-1">
                {caseData.status === "disposed"
                    ? caseData.disposal_reason || "Case Disposed"
                    : "Matter Pending Before Court"}
            </p>
        </div>

        {/* Divider */}

        <div className="col-span-1 flex justify-center">
            <div className="w-px h-16 bg-white/40" />
        </div>

        {/* Right */}

        <div className="col-span-3 px-6">

            <div className="flex items-center gap-3">

                <span className="text-3xl">
                    {caseData.status === "disposed"
                        ? "📅"
                        : "⏰"}
                </span>

                <div>

                    <p className="text-base opacity-90">
                        {caseData.status === "disposed"
                            ? "Disposed On"
                            : "Next Hearing"}
                    </p>

                    <p className="text-3xl font-bold">
                        {caseData.status === "disposed"
                            ? formatDate(caseData.disposed_date)
                            : formatDate(caseData.next_hearing_date)}
                    </p>

                </div>

            </div>

        </div>

    </div>
</div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">
                                        Filing Number
                                    </p>
                                    <p className="font-semibold">
                                        {caseData.filing_number || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Registration Number
                                    </p>
                                    <p className="font-semibold">
                                        {caseData.registration_number || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        CNR Number
                                    </p>
                                    <p className="font-semibold">
                                        {caseData.cnr_number || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Court Name
                                    </p>
                                    <p className="font-semibold">
                                        {caseData.court_name || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Judge
                                    </p>
                                    <p className="font-semibold">
                                        {caseData.judge_name || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        First Hearing Date
                                    </p>
                                    <p className="font-semibold">
                                        {caseData.first_hearing_date || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Next Hearing Date
                                    </p>
                                    <p className="font-semibold">
                                        {formatDate(
                                            caseData.next_hearing_date
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Petitioner
                                    </p>
                                    <p className="font-semibold">
                                        {caseData.petitioner_name || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Respondent
                                    </p>
                                    <p className="font-semibold">
                                        {caseData.respondent_name || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Petitioner Advocate
                                    </p>
                                    <p className="font-semibold">
                                        {caseData.petitioner_addvocate_name || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Respondent Advocate
                                    </p>
                                    <p className="font-semibold">
                                        {caseData.respondent_addvocate_name || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Under Act
                                    </p>
                                    <p className="font-semibold">
                                        {caseData.under_acts || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Under Sections
                                    </p>
                                    <p className="font-semibold">
                                        {caseData.under_sections || "-"}
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
                            </div>

                        </div>

                        <div className="flex flex-wrap gap-3">

<button
    onClick={() =>
        
        navigate(`/advocate/cases/${caseData.id}/edit`)
    }
    className="
px-5
py-2.5
rounded-xl
bg-sky-600
text-white
font-semibold
shadow-md
hover:bg-sky-700
transition
"
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
                {/* close header card */}

                {/* CLIENT + ACTIONS */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

<div className="bg-white rounded-2xl shadow p-6">
    <h2 className="text-xl font-bold mb-4">
        Client Information
    </h2>

    {caseData?.clients ? (
        <div className="space-y-2">
            <p>
                <strong>Name:</strong>{" "}
                {caseData.clients.client_name}
            </p>

            <p>
                <strong>Phone:</strong>{" "}
                {caseData.clients.phone_number}
            </p>

            <p>
                <strong>Email:</strong>{" "}
                {caseData.clients.email}
            </p>

            <p>
                <strong>Address:</strong>{" "}
                {caseData.clients.address}
            </p>
        </div>
    ) : (
        <p className="text-gray-500">
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
                    <DocumentUploader caseId={id || ""} />
                </div>

                {/* HEARINGS */}

                <div className="space-y-6">
                    <HearingAnalyticsCard caseId={id || ""} />

                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                        <HearingsList caseId={id || ""} />
                    </div>
                    {false && (
    <CaseTimeline
        caseId={id || ""}
    />
)}
{false && (
    <HearingAuditTrail
        caseId={id || ""}
    />
)}
                
                </div>

            </div>

        </DashboardLayout>
    );
}