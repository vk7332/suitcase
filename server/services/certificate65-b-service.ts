export const generate65BCertificate = ({
    caseId,
    logs,
    generatedBy,
}: {
    caseId: string;
    logs: any[];
    generatedBy: string;
}) => {
    const date = new Date().toLocaleDateString();

    const hashSummary = logs.map((l) => l.hash).join("\n");

    return `
CERTIFICATE UNDER SECTION 65B OF THE INDIAN EVIDENCE ACT, 1872

I, ${generatedBy}, do hereby certify:

1. That the electronic records annexed herein pertain to Case ID: ${caseId}.

2. That the said records were generated and stored using a computer system in the ordinary course of activities.

3. That the computer system was operating properly during the relevant period.

4. That the information contained in the electronic records is a true and accurate reproduction of the original data.

5. That the integrity of the records is ensured through cryptographic hash values as below:

${hashSummary}

6. That this certificate is issued in compliance with Section 65B of the Indian Evidence Act, 1872.

Place: __________  
Date: ${date}  

Signature: ____________________  
Name: ${generatedBy}
`;
};