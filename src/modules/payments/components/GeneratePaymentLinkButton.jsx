import React from "react";
import { generatePaymentLink } from "../services/razorpay-service";

const GeneratePaymentLinkButton = ({ invoice, onSuccess }) => {
    const handleGenerateLink = async () => {
        const link = await generatePaymentLink(invoice);
        if (link) {
            alert("Payment Link Generated Successfully!");
            if (onSuccess) onSuccess();
        }
    };

    return (
        <button
            onClick={handleGenerateLink}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
            Generate Payment Link
        </button>
    );
};

export default GeneratePaymentLinkButton;
