import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import CaseTimeline from "../../components/cases/CaseTimeline";
import DocumentUploader from "../../components/documents/DocumentUploader";
import { sendWhatsAppReminder } from "../../utils/whatsapp";
import { sendEmailReminder } from "../../utils/email";
import { addToGoogleCalendar } from "../../utils/googleCalendar";
import { openECourt } from "../../utils/ecourts";

import { sendWhatsAppAPI } from "../../services/WhatsAppService";

export default function CaseDetailsPage() {
    const { id } = useParams();

    const [caseData, setCaseData] = useState<any>(null);
    const [client, setClient] = useState<any>(null);

    useEffect(() => {
        loadCase();
    }, []);

    const loadCase = async () => {
        const { data } = await supabase
            .from("cases")
            .select("*")
            .eq("id", id)
            .single();

        setCaseData(data);

        if (data?.client_id) {
            const { data: clientData } = await supabase
                .from("clients")
                .select("*")
                .eq("id", data.client_id)
                .single();

            setClient(clientData);
        }
    };

    if (!caseData) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6">

            {/* 🧾 CASE HEADER */}
            <h2 className="text-xl font-bold">
                {caseData.title}
            </h2>

            <p className="text-sm text-gray-600">
                Case No: {caseData.case_number}
            </p>

            {/* 📲 ACTION BUTTONS */}
            {client && (
                <div className="mt-3 space-x-2">

                    <button
                        onClick={() =>
                            sendWhatsAppReminder(caseData, client)
                        }
                        className="bg-green-600 text-white px-3 py-1"
                    >
                        📲 WhatsApp
                    </button>

                    <button
                        onClick={() =>
                            sendWhatsAppAPI({
                                to: client.phone,
                                message: `⚖️ Reminder:
Case: ${caseData.title}
Next Date: ${new Date(caseData.next_date).toLocaleDateString()}`,
                            })
                        }
                        className="bg-green-700 text-white px-3 py-1"
                    >
                        🚀 Auto WhatsApp
                    </button>

                    <button
                        onClick={() =>
                            sendEmailReminder(caseData, client)
                        }
                        className="bg-blue-600 text-white px-3 py-1"
                    >
                        📧 Email
                    </button>

                    <button
                        onClick={() =>
                            addToGoogleCalendar(caseData)
                        }
                        className="bg-purple-600 text-white px-3 py-1"
                    >
                        📅 Calendar
                    </button>

                    <button
                        onClick={() =>
                            openECourt(caseData.case_number)
                        }
                        className="bg-gray-700 text-white px-3 py-1"
                    >
                        🏛️ eCourts
                    </button>

                </div>
            )}

            {/* 👤 CLIENT DETAILS */}
            {client && (
                <div className="mt-4 border p-3">
                    <h3 className="font-bold">Client</h3>
                    <p>Name: {client.name}</p>
                    <p>Phone: {client.phone}</p>
                    <p>Email: {client.email}</p>
                </div>
            )}

            {/* 📅 CASE INFO */}
            <div className="mt-4 border p-3">
                <p>Status: {caseData.status}</p>
                <p>
                    Next Date:{" "}
                    {caseData.next_date
                        ? new Date(caseData.next_date).toLocaleDateString()
                        : "-"}
                </p>
            </div>

            {/* 📂 DOCUMENTS */}
            <DocumentUploader caseId={id} />

            {/* 📖 TIMELINE */}
            <CaseTimeline caseId={id} />

        </div>
    );
}


