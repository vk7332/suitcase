export const openECourt = () => {
    window.open(
        "https://services.ecourts.gov.in/ecourtindia_v6/",
        "_blank"
    );
};

export const openCaseStatusSearch = () => {
    window.open(
        "https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus/index&app_token=",
        "_blank"
    );
};

export const searchByCNR = (
    cnr?: string
) => {

    if (!cnr) {
        alert(
            "CNR number not available"
        );
        return;
    }

    navigator.clipboard.writeText(cnr);

    window.open(
        "https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus/index&app_token=",
        "_blank"
    );

    alert(
        `CNR copied: ${cnr}

Paste into eCourts search.`
    );
};