import React from "react";
import { sendInvoiceEmail } from "../services/email-service";

const SendEmailButton = ({ invoice }) => {
    const handleSend = async () => {
        try {
            await sendInvoiceEmail(invoice);
            alert("Invoice sent successfully via Email!");
        } catch (error) {
            alert("Failed to send email.");
        }
    };

    return (
        <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-3 py-1 rounded"
        >
            Email
        </button>
    );
};

export default SendEmailButton;
