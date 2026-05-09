declare global {
    interface Window {
        signerDigital?: any;
    }
}

export const isSignerAvailable = () => {
    return typeof window !== "undefined" && !!window.signerDigital;
};

export const signHashWithDSC = async (hash: string) => {
    if (!window.signerDigital) {
        throw new Error("Signer.Digital extension not available");
    }

    try {
        const response = await window.signerDigital.sign({
            data: hash,              // your SHA256 hash
            algo: "SHA256",          // hashing algorithm
            type: "hash",            // important
        });

        /*
          Expected response (varies slightly by provider):
          {
            signature: "BASE64...",
            certificate: "...",
            signerName: "Vipin Kumar"
          }
        */

        return response;
    } catch (err: any) {
        throw new Error(err.message || "DSC signing failed");
    }
};

export const getCertificateDetails = async () => {
    if (!window.signerDigital) {
        throw new Error("Signer.Digital extension not available");
    }
}

