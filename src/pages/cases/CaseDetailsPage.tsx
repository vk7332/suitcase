import { useEffect, useState, MouseEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { supabase } from "@/utils/supabase/supabase-client";

import DashboardLayout from "@/components/layout/DashboardLayout";

import CaseTimeline from "@/components/cases/CaseTimeline";
import DocumentUploader from "@/components/documents/DocumentUploader";
import CaseStatusBadge from "@/components/cases/CaseStatusBadge";
import {
    searchByCNR,
    openCaseStatusSearch
} from "@/utils/ecourts";

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

const openCaseStatus = () => {
    window.open(
        "https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus/index&app_token=",
        "_blank"
    );
};

const openCnrSearch = () => {
    window.open(
        "https://services.ecourts.gov.in/ecourtindia_v6/?p=cnrsearch/index&app_token=",
        "_blank"
    );
};

const openAdvocateSearch = () => {
    window.open(
        "https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus/index&app_token=",
        "_blank"
    );
};

const openCauseList = () => {
    window.open(
        "https://services.ecourts.gov.in/ecourtindia_v6/?p=cause_list/index&app_token=",
        "_blank"
    );
};

const openJudgments = () => {
    window.open(
        "https://services.ecourts.gov.in/ecourtindia_v6/?p=courtorder/index&app_token=",
        "_blank"
    );
};

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
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">

    <button
        onClick={openCaseStatus}
        className="bg-blue-600 text-white rounded-2xl p-5 text-left hover:opacity-90"
    >
        <div className="text-xl font-bold">
            Case Status
        </div>

        <p className="text-sm mt-2">
            Search by party name, filing number and more.
        </p>
    </button>

    <button
        onClick={openCnrSearch}
        className="bg-indigo-600 text-white rounded-2xl p-5 text-left hover:opacity-90"
    >
        <div className="text-xl font-bold">
            CNR Search
        </div>

        <p className="text-sm mt-2">
            Search directly using CNR number.
        </p>
    </button>

    <button
        onClick={openAdvocateSearch}
        className="bg-emerald-600 text-white rounded-2xl p-5 text-left hover:opacity-90"
    >
        <div className="text-xl font-bold">
            Advocate Search
        </div>

        <p className="text-sm mt-2">
            Find cases linked to advocate details.
        </p>
    </button>

    <button
        onClick={openCauseList}
        className="bg-orange-500 text-white rounded-2xl p-5 text-left hover:opacity-90"
    >
        <div className="text-xl font-bold">
            Cause List
        </div>

        <p className="text-sm mt-2">
            Daily court cause lists.
        </p>
    </button>

    <button
        onClick={openJudgments}
        className="bg-purple-600 text-white rounded-2xl p-5 text-left hover:opacity-90"
    >
        <div className="text-xl font-bold">
            Judgments
        </div>

        <p className="text-sm mt-2">
            Search court judgments.
        </p>
    </button>

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

                    <DocumentUploader caseId={id} />

                </div>

                {/* TIMELINE */}

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

                    {/* 📖 CASE TIMELINE */}
<CaseTimeline caseId={id || ""} />

                </div>

            </div>

        </DashboardLayout>
    );
}