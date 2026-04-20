export function generateEcourtsLink(caseData: any) {
    const base =
        "https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus/index";

    const params = new URLSearchParams({
        state: caseData.state_code,
        dist: caseData.district_code,
        court: caseData.court_code,
        case_no: caseData.case_number,
        year: caseData.case_year,
    });

    return `${base}&${params.toString()}`;
}


