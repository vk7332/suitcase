import { useState, MouseEvent } from "react";

interface Props {
    onImport: (data: any) => void;
}

export default function ECourtsImportAssistant({
    onImport,
}: Props) {

    const [ecourtText, setEcourtText] = useState("");

    const openECourts = () => {
        window.open(
            "https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus/index",
            "_blank"
        );
    };

const handleAutoParse = () => {

    if (!ecourtText.trim()) {
        alert("Paste eCourts text first");
        return;
    }

    // =========================
    // REGEX EXTRACTION
    // =========================

const caseTitleMatch =
    ecourtText.match(
        /([^\n]+)\s*\n\s*Vs\.?\s*\n\s*([^\n]+)/i
    );

    const cnrMatch =
        ecourtText.match(/CNR Number[:\s]*([A-Z0-9]+)/i);

    const caseTypeMatch =
        ecourtText.match(/Case Type[:\s]*([^\n]+)/i);

const registrationNumberMatch =
  ecourtText.match(
      /Registration Number\s+([0-9\/]+)/i
  );

const filingNumberMatch =
  ecourtText.match(
      /Filing Number\s+([0-9\/]+)/i
  );

const courtNameMatch =
    ecourtText.match(
        /^([^\n]*Sarkaghat[^\n]*)/im
    );

const judgeMatch =
    ecourtText.match(
        /Court Number and Judge\s+([^\n]+)/i
    );    

const nextHearingMatch =
        ecourtText.match(
            /Next.*?Hearing.*?Date[:\s]*([^\n]+)/i
        );

const firstHearingMatch =
    ecourtText.match(
        /First Hearing Date[\s\r\n]+([^\n]+)/i
    );

    const stageMatch =
        ecourtText.match(/Case Stage[:\s]*([^\n]+)/i);

const petitionerMatch =
    ecourtText.match(
        /Petitioner and Advocate[\s\S]*?1\)\s*([^\n]+)/i
    );

const respondentMatch =
    ecourtText.match(
        /Respondent and Advocate[\s\S]*?1\)\s*([^\n]+)/i
    );

// extract line that mentions Acts/Sections (examples: "Under Acts: Indian Penal Code, 1860" or "Under Sections: 302, 34")
const actsBlockMatch = ecourtText.match(
  /Acts[\s\S]*?Under Act\(s\)\s*Under Section\(s\)\s*([\s\S]*?)(?:\n\s*\n|$)/i
);

const actsLine = actsBlockMatch?.[1]?.trim() || "";

const underActs =
  actsLine.replace(/\b\d+(?:,\d+)*\b/g, "").trim();

const underSections =
  actsLine.match(/\d+(?:,\d+)*/)?.[0] || "";

    const generatedCaseTitle =
        petitionerMatch?.[1]?.trim() && respondentMatch?.[1]?.trim()
            ? `${petitionerMatch[1].trim()} vs ${respondentMatch[1].trim()}`
            : "";

    // =========================
    // PARSED OBJECT
    // =========================

    const parsedData = {
        caseTitle: `${petitionerMatch?.[1]?.trim() || ""} vs ${respondentMatch?.[1]?.trim() || ""}`,
        caseNumber: registrationNumberMatch?.[1]?.trim() || "",
        caseType: caseTypeMatch?.[1]?.trim() || "",
        caseStage: stageMatch?.[1]?.trim() || "",
        filingNumber: filingNumberMatch?.[1] || "",
        registrationNumber: registrationNumberMatch?.[1] || "",
        cnrNumber: cnrMatch?.[1]?.trim() || "",
        courtName: courtNameMatch?.[1]?.trim() || "",
        judgeName: judgeMatch?.[1]?.trim() || "",
        firstHearingDate: firstHearingMatch?.[1]?.trim() || "",
        nextHearingDate: nextHearingMatch?.[1]?.trim() || "",
        petitioner: petitionerMatch?.[1]?.trim() || "",
        respondent: respondentMatch?.[1]?.trim() || "",
                underActs: underActs || "",
                underSections: underSections || "",
        clientName: petitionerMatch?.[1]?.trim() || "",
        partyType: "Plaintiff",
    };

    console.log("PARSED DATA:", parsedData);

    handleImportedData(parsedData);
};

    function parseCaseText(event: MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        handleAutoParse();
    }

    const handleImportedData = (parsedData: {
        caseTitle: string;
        caseNumber: string;
        caseType: string;
        caseStage: string;
        filingNumber: string;
        registrationNumber: string;
        cnrNumber: string;
        courtName: string;
        judgeName: string;
        firstHearingDate: string;
        nextHearingDate: string;
        petitioner: string;
        respondent: string;
        underActs: string;
        underSections: string;
        clientName: string;
        partyType: string;
    }) => {
        console.log("PARSED DATA:", parsedData);
        
        onImport(parsedData);
    };

    return (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 mb-8">

            <div className="flex items-center justify-between mb-4">

                <div>
                    <h2 className="text-xl font-bold">
                        eCourts Smart Import
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                        Import live court data from official eCourts services
                    </p>
                </div>

                <button
                    onClick={openECourts}
                    className="bg-[#089CCE] hover:bg-[#067aa3] text-white px-5 py-3 rounded-2xl font-semibold"
                >
                    Open eCourts
                </button>

            </div>

<textarea
    value={ecourtText}
    onChange={(e) => setEcourtText(e.target.value)}
    rows={14}
    className="w-full border rounded-2xl p-4"
    placeholder="Paste full eCourts case details here"
/>

            <button
                onClick={parseCaseText}
                className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:opacity-90"
            >
                Auto Parse & Fill
            </button>

        </div>
    );
}

