import { useEffect, useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/utils/supabase/supabase-client";
import { toast } from "react-toastify";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { createCase } from "@/services/case-service";
import ECourtsImportAssistant from "@/components/cases/ECourtsImportAssistant";

export default function CreateCasePage() {
    const navigate = useNavigate();
const [clientId, setClientId] = useState<string>("");
const [clients, setClients] = useState<Array<any>>([]);
const [loading, setLoading] = useState(false);

    // CASE FIELDS
const [ecourtText, setEcourtText] = useState("");
const [filingNumber, setFilingNumber] = useState("");
const [registrationNumber, setRegistrationNumber] = useState("");
const [caseStage, setCaseStage] = useState("");
const [judgeName, setJudgeName] = useState("");
const [firstHearingDate, setFirstHearingDate] = useState("");
const [petitioner, setPetitioner] = useState("");
const [respondent, setRespondent] = useState("");
const [petitionerAdvocate, setPetitionerAdvocate] = useState("");
const [respondentAdvocate, setRespondentAdvocate] = useState("");
const [underActs, setUnderActs] = useState("");
const [underSections, setUnderSections] = useState("");
const [clientName, setClientName] = useState("");
const [partyType, setPartyType] = useState("");
    // DEMO eCourts autofill
const [caseTitle, setCaseTitle] = useState("");
const [caseNumber, setCaseNumber] = useState("");
const [caseType, setCaseType] = useState("");
const [courtName, setCourtName] = useState("");
const [cnrNumber, setCnrNumber] = useState("");
const [nextHearingDate, setNextHearingDate] = useState("");

function formatDate(date: Date) {

const yyyy = date.getFullYear();

const mm = String(
    date.getMonth() + 1
).padStart(2, "0");

const dd = String(
    date.getDate()
).padStart(2, "0");

return `${yyyy}-${mm}-${dd}`;
}

const normalizeECourtDate = (dateStr: string) => {
    if (!dateStr) return "";

    const cleaned = dateStr
        .replace(/st|nd|rd|th/g, "")
        .trim();

    const date = new Date(cleaned);

    if (isNaN(date.getTime())) {
        return "";
    }

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
};

const handleImportedData = (data: any) => {
    console.log("RECEIVED IMPORT:", data);

    setCaseTitle(data.caseTitle || "");
    setCaseNumber(data.caseNumber || "");
    setCaseType(data.caseType || "");

    setCaseStage(data.caseStage || "");

    setFilingNumber(data.filingNumber || "");
    setRegistrationNumber(data.registrationNumber || "");

    setCnrNumber(data.cnrNumber || "");

    setCourtName(data.courtName || "");
    setJudgeName(data.judgeName || "");

setFirstHearingDate(
    normalizeECourtDate(data.firstHearingDate)
);

setNextHearingDate(
    normalizeECourtDate(data.nextHearingDate)
);

    setPetitioner(data.petitioner || "");
    setRespondent(data.respondent || "");

    setPetitionerAdvocate(
        data.petitionerAdvocate || ""
    );

    setRespondentAdvocate(
        data.respondentAdvocate || ""
    );

    setUnderActs(data.underActs || "");

    setUnderSections(
        data.underSections || ""
    );

    setClientName(
        data.clientName || ""
    );

    if (
        data.clientName &&
        data.clientName === data.petitioner
    ) {
        setPartyType("Plaintiff");
    } else if (
        data.clientName &&
        data.clientName === data.respondent
    ) {
        setPartyType("Defendant");
    } else {
        setPartyType(
            data.partyType || "Plaintiff"
        );
        if (
    data.clientName &&
    data.clientName === data.petitioner
) {
    setPartyType("Plaintiff");
}
else if (
    data.clientName &&
    data.clientName === data.respondent
) {
    setPartyType("Defendant");
}
else {
    setPartyType(
        data.partyType || "Plaintiff"
    );
}
    }

    alert("Case imported successfully");
};

    async function handleCreate(event: any): Promise<void> {
        event.preventDefault();

        // basic validation
        if (!caseTitle.trim()) {
            toast.error("Case title is required");
            return;
        }

        setLoading(true);

const payload = {

    case_title: caseTitle,

    case_number: caseNumber,

    court_name: courtName,

    case_type: caseType,

    case_stage: caseStage,

    filing_number: filingNumber,

    registration_number: registrationNumber,

    cnr_number: cnrNumber,

    first_hearing_date: firstHearingDate,

    next_hearing_date: nextHearingDate,

    judge_name: judgeName,

    petitioner_name: petitioner,

    petitioner_advocate: petitionerAdvocate,

    respondent_name: respondent,

    respondent_advocate: respondentAdvocate,

    under_acts: underActs,

    under_sections: underSections,

    client_side: partyType,

    client_id:
    clientId && clientId.trim() !== ""
        ? clientId
        : null,

    status: "active" as const
};

        try {
            // prefer service helper if available
            let createdCase: any = null;

            if (typeof createCase === "function") {
                console.log("CASE PAYLOAD", JSON.stringify(payload, null, 2));
                const res = await createCase(payload);
                // if service returns error-like object
                if (res && (res.error || res.status >= 400)) {
                    throw res.error || new Error("Failed to create case");
                }
                // try common response shapes
                createdCase = res?.data || res?.case || res || null;
                // if array returned, take first
                if (Array.isArray(createdCase) && createdCase.length) {
                    createdCase = createdCase[0];
                }
            } else {
                // fallback: insert directly to supabase
                const { data, error } = await supabase.from("cases").insert([payload]).select();
                if (error) throw error;
                createdCase = Array.isArray(data) ? data[0] : data;
            }

            toast.success("Case created successfully");

            if (createdCase && createdCase.id) {
                navigate(`/advocate/cases/${createdCase.id}`);
            } else {
                navigate(`/advocate/cases`);
            }
        } catch (err: any) {
            console.error("Create case error:", err);
            toast.error(err?.message || "Failed to create case");
        } finally {
            setLoading(false);
        }
    }

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">

                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">
                            Case Management
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Track and manage your legal cases
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/advocate/cases")}
                        className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-2xl font-semibold"
                    >
                        Cancel
                    </button>
                </div>

                {/* MAIN CARD */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

                    <h2 className="text-2xl font-bold mb-8">
                        New Case Details
                    </h2>

<ECourtsImportAssistant
    onImport={handleImportedData}
/>

                    {/* FORM */}
{/* FORM */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

    {/* CASE TITLE */}
    <div className="md:col-span-2">
        <label className="block mb-2 font-semibold">
            Case Title
        </label>

        <input
            value={caseTitle}
            onChange={(e) => setCaseTitle(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            placeholder="e.g. P.N.B. Sarkaghat vs Joginder Paul"
        />
    </div>

    {/* CASE TYPE */}
    <div>
        <label className="block mb-2 font-semibold">
            Case Type
        </label>

        <input
            value={caseType}
            onChange={(e) => setCaseType(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            placeholder="Civil Suit"
        />
    </div>

    {/* CASE STAGE */}
    <div>
        <label className="block mb-2 font-semibold">
            Case Stage
        </label>

        <input
            value={caseStage}
            onChange={(e) => setCaseStage(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            placeholder="Further Order"
        />
    </div>

    {/* FILING NUMBER */}
    <div>
        <label className="block mb-2 font-semibold">
            Filing Number
        </label>

        <input
            value={filingNumber}
            onChange={(e) => setFilingNumber(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            placeholder="548/2023"
        />
    </div>

    {/* REGISTRATION NUMBER */}
    <div>
        <label className="block mb-2 font-semibold">
            Registration Number
        </label>

        <input
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            placeholder="130/2023"
        />
    </div>

    {/* CNR NUMBER */}
    <div>
        <label className="block mb-2 font-semibold">
            CNR Number
        </label>

        <input
            value={cnrNumber}
            onChange={(e) => setCnrNumber(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            placeholder="HPMA110005472023"
        />
    </div>

    {/* COURT NAME */}
    <div>
        <label className="block mb-2 font-semibold">
            Court Name
        </label>

        <input
            value={courtName}
            onChange={(e) => setCourtName(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            placeholder="Civil Judge Senior Division"
        />
    </div>

    {/* JUDGE */}
    <div>
        <label className="block mb-2 font-semibold">
            Judge
        </label>

        <input
            value={judgeName}
            onChange={(e) => setJudgeName(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            placeholder="Judge Name"
        />
    </div>

    {/* FIRST HEARING DATE */}
    <div>
        <label className="block mb-2 font-semibold">
            First Hearing Date
        </label>

        <input
            type="date"
            value={firstHearingDate}
            onChange={(e) => setFirstHearingDate(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
        />
    </div>

    {/* NEXT HEARING DATE */}
    <div>
        <label className="block mb-2 font-semibold">
            Next Hearing Date
        </label>

        <input
            type="date"
            value={nextHearingDate}
            onChange={(e) => setNextHearingDate(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
        />
    </div>

    {/* PETITIONER */}
    <div>
        <label className="block mb-2 font-semibold">
            Petitioner
        </label>

        <input
            value={petitioner}
            onChange={(e) => setPetitioner(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            placeholder="Petitioner Name"
        />
    </div>

    {/* RESPONDENT */}
    <div>
        <label className="block mb-2 font-semibold">
            Respondent
        </label>

        <input
            value={respondent}
            onChange={(e) => setRespondent(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            placeholder="Respondent Name"
        />
    </div>

    {/* PETITIONER ADVOCATE */}
    <div>
        <label className="block mb-2 font-semibold">
            Petitioner Advocate
        </label>

        <input
            value={petitionerAdvocate}
            onChange={(e) => setPetitionerAdvocate(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            placeholder="Advocate Name"
        />
    </div>

    {/* RESPONDENT ADVOCATE */}
    <div>
        <label className="block mb-2 font-semibold">
            Respondent Advocate
        </label>

        <input
            value={respondentAdvocate}
            onChange={(e) => setRespondentAdvocate(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            placeholder="Advocate Name"
        />
    </div>

    {/* CLIENT */}
    <div>
        <label className="block mb-2 font-semibold">
            Client
        </label>

        <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            placeholder="Your Client Name"
        />
    </div>

    {/* PARTY TYPE */}
    <div>
        <label className="block mb-2 font-semibold">
            Party Type
        </label>

<select
    value={partyType}
    onChange={(e) =>
        setPartyType(e.target.value)
    }
            className="w-full border rounded-2xl px-4 py-3"
        >
            <option value="Plaintiff">Plaintiff</option>
            <option value="Defendant">Defendant</option>
            <option value="Petitioner">Petitioner</option>
            <option value="Respondent">Respondent</option>
        </select>
    </div>

    {/* ACT */}
    <div>
        <label className="block mb-2 font-semibold">
            Under Act(s)
        </label>

        <input
            value={underActs}
            onChange={(e) => setUnderActs(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            placeholder="CODE OF CIVIL PROCEDURE"
        />
    </div>

    {/* SECTION */}
    <div>
        <label className="block mb-2 font-semibold">
            Under Section(s)
        </label>

        <input
            value={underSections}
            onChange={(e) => setUnderSections(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            placeholder="34"
        />
    </div>

</div>
                    {/* ACTION */}
                    <div className="mt-10">
                        <button
                            onClick={handleCreate}
                            disabled={loading}
                            className="bg-[#089CCE] hover:bg-[#067aa3] text-white px-10 py-4 rounded-2xl font-bold text-lg"
                        >
                            {loading ? "Creating..." : "Create Case"}
                        </button>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}

async function updateCase(
    id: any,
    payload: {
        case_title: string;
        case_number: string;
        court_name: string;
        case_type: string;
        case_stage: string;
        filing_number: string;
        registration_number: string;
        cnr_number: string;
        first_hearing_date: string;
        next_date: string;
        judge_name: string;
        petitioner_name: string;
        petitioner_advocate: string;
        respondent_name: string;
        respondent_advocate: string;
        under_acts: string;
        under_sections: string;
        client_side: string;
        client_id: string | null;
        status: "active";
    }
) {
    if (!id) {
        console.warn("updateCase called without id; skipping update.");
        return null;
    }

    const { data, error } = await supabase
        .from("cases")
        .update(payload)
        .eq("id", id)
        .select();

    if (error) {
        throw error;
    }

    return Array.isArray(data) ? data[0] : data;
}
