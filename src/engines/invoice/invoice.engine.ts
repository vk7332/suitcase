// src/engines/invoice/invoice.engine.ts

export const generateInvoiceApi = async (paymentId: string) => {
    const res = await fetch("/api/invoice/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ paymentId }),
    });

    if (!res.ok) {
        throw new Error("failed to generate invoice");
    }

    return res.json();
};