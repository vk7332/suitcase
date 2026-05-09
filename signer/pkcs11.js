const pkcs11js = require("pkcs11js");
const crypto = require("crypto");
const { PKCS11_LIB, PIN } = require("./config");

const pkcs11 = new pkcs11js.PKCS11();

let session;

const init = () => {
    pkcs11.load(PKCS11_LIB);
    pkcs11.C_Initialize();

    const slots = pkcs11.C_GetSlotList(true);
    if (!slots.length) throw new Error("No token found");

    const slot = slots[0];

    session = pkcs11.C_OpenSession(
        slot,
        pkcs11js.CKF_SERIAL_SESSION | pkcs11js.CKF_RW_SESSION
    );

    pkcs11.C_Login(session, 1, PIN); // 1 = USER
};

const signHash = (hashBuffer) => {
    // find private key
    const template = [
        { type: pkcs11js.CKA_CLASS, value: pkcs11js.CKO_PRIVATE_KEY },
    ];

    pkcs11.C_FindObjectsInit(session, template);
    const [privateKey] = pkcs11.C_FindObjects(session, 1);
    pkcs11.C_FindObjectsFinal(session);

    if (!privateKey) throw new Error("Private key not found");

    // sign
    pkcs11.C_SignInit(session, { mechanism: pkcs11js.CKM_RSA_PKCS }, privateKey);

    const signature = pkcs11.C_Sign(session, hashBuffer, Buffer.alloc(256));

    return signature.toString("base64");
};

module.exports = {
    init,
    signHash,
};