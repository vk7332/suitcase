import React from "react";
import { sendInvoiceWhatsApp } from "../services/whatsapp-service";

const SendWhatsAppButton = ({ invoice }) => (
    <button
        onClick={() => sendInvoiceWhatsApp(invoice)}
        className="bg-green-600 text-white px-3 py-1 rounded"
    >
        WhatsApp
    </button>
);

export default SendWhatsAppButton;
