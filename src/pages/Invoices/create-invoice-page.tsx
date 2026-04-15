import React from "react";
import {
    determineInvoiceType,
    calculateTotals,
} from "../../utils/invoiceUtils";
import { saveInvoice } from "../../services/invoiceService";
import { generateGSTInvoicePDF } from "../../utils/generateGSTInvoicePDF";
import { useProfile } from "../../hooks/useProfile";

const CreateInvoicePage: React.FC = () => {
    const { profile } = useProfile();

    const handleCreateInvoice = async () => {
        const client = {
            name: "ABC Pvt. Ltd.",
            address: "New Delhi, India",
            gstin: "07ABCDE1234F1Z5",
            isBusinessClient: true,
            state: "Delhi",
        };

        const items = [
            {
                description: "Professional Legal Fees",
                quantity: 1,
                rate: 5000,
            },
        ];

        const invoiceType = determineInvoiceType(client);
        const totals = calculateTotals(items, invoiceType);

        const invoiceData = {
            invoice_number: `INV-${Date.now()}`,
            invoice_date: new Date().toISOString().split("T")[0],
            place_of_supply: client.state || "Himachal Pradesh",
            client,
            items,
            subtotal: totals.subtotal,
            gst_amount: totals.gstAmount,
            total_amount: totals.total,
            invoice_type: invoiceType,
        };

        try {
            await saveInvoice(invoiceData);

            if (profile) {
                await generateGSTInvoicePDF(
                    {
                        name: profile.full_name,
                        chamberName: profile.chamber_name,
                        address: profile.address,
                        phone: profile.phone,
                        email: profile.email,
                        website: profile.website,
                        gstin: profile.gstin,
                        logoUrl: profile.logo_url,
                        signatureUrl: profile.signature_url,
                    },
                    {
                        invoiceNumber: invoiceData.invoice_number,
                        invoiceDate: invoiceData.invoice_date,
                        placeOfSupply: invoiceData.place_of_supply,
                        clientName: client.name,
                        clientAddress: client.address,
                        clientGSTIN: client.gstin,
                        items,
                        gstRate: 18,
                    }
                );
            }

            alert("Invoice generated successfully!");
        } catch (error) {
            console.error(error);
            alert("Error generating invoice.");
        }
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h1 className="text-2xl font-bold mb-4">
                Create GST-Compliant Invoice
            </h1>
            <button
                onClick={handleCreateInvoice}
                className="bg-blue-600 text-white px-6 py-2 rounded"
            >
                Generate Invoice
            </button>
        </div>
    );
};

export default CreateInvoicePage;
