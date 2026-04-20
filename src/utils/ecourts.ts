export function openECourt(caseNumber: string) {
    const url =
        "https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus";

    window.open(url, "_blank");
}


