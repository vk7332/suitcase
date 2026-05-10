import React from "react";
import { generateGSTInvoicePDF } from "../../utils/generateGSTInvoicePDF";
import { useProfile } from "../../hooks/useProfile";
import { determineInvoiceType } from "../../utils/invoiceUtils";

const GSTInvoicePage: React.FC = () => {
    const { profile } = useProfile();

    const handleGenerateInvoice = async () => {
        if (!profile) {
            alert("Please complete your profile first.");
            return;
        }

        const mockInvoiceData = {
            invoice_number: "INV-001",
            invoice_date: new Date().toISOString().split("T")[0],
            place_of_supply: "Himachal Pradesh",
            client: {
                name: "ABC Client",
                address: "New Delhi, India",
                gstin: "07ABCDE1234F1Z5",
            },
            items: [
                {
                    description: "Professional Legal Fees",
                    quantity: 1,
                    rate: 5000,
                },
            ],
            subtotal: 5000,
            gst_amount: 900,
            total_amount: 5900,
            invoice_type: "RECEIPT" as any,
        };

        await generateGSTInvoicePDF(
            {
                name: profile.full_name || "",
                chamberName: profile.chamber_name,
                address: profile.address,
                phone: profile.phone,
                email: profile.email,
                website: profile.website,
                gstin: (profile as any).gstin,
                logoUrl: profile.logo_url,
                signatureUrl: profile.signature_url,
            },
            mockInvoiceData as any
        );
    };

    const client = {
        name: "ABC Pvt. Ltd.",
        address: "New Delhi, India",
        gstin: "07ABCDE1234F1Z5",
        isBusinessClient: true,
        state: "Delhi",
    };

    const invoiceType = determineInvoiceType(client);

    <p className="text-gray-600 mb-4">
        Document Type: <strong>{invoiceType.replace(/_/g, " ")}</strong>
    </p>

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded-lg">
            <h1 className="text-3xl font-bold text-blue-700 mb-4">
                GST Invoice Generator
            </h1>

            <button
                onClick={handleGenerateInvoice}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
                Generate GST Invoice
            </button>
        </div>
    );
};

export default GSTInvoicePage;


