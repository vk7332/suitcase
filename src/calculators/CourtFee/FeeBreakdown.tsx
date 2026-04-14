import React from "react";

const Row = ({ label, value }: any) => (
    <div className="flex justify-between py-1 border-b">
        <span>{label}</span>
        <span>₹ {value.toFixed(2)}</span>
    </div>
);

const FeeBreakdown = ({ data }: any) => {
    if (!data) return null;

    return (
        <div className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-semibold mb-3">Fee Breakdown</h3>

            <Row label="Court Fee" value={data.court-fee} />
            <Row label="Filing Fee" value={data.filingFee} />
            <Row label="Process Fee" value={data.processFee} />
            <Row label="Application Fee" value={data.applicationFee} />
            <Row label="Affidavit Fee" value={data.affidavitFee} />
            <Row label="Notary Fee" value={data.notaryFee} />
            <Row label="Vakalatnama Fee" value={data.vakalatnamaFee} />

            <div className="flex justify-between mt-3 font-bold text-lg">
                <span>Total</span>
                <span>₹ {data.total.toFixed(2)}</span>
            </div>

            <p className="text-xs text-gray-500 mt-2">
                * Minimum application fee in Himachal Pradesh is ₹20 per application.
            </p>

            <div className="mt-4 text-sm text-gray-600">
                <p>
                    Built by <strong>VK Tax & Law Chamber®</strong>
                </p>
                <p>Adv. VIPIN KUMAR TAMRA</p>
                <p>📞 7018064385</p>
                <p>✉️ vk7332gmail.com (Personal)</p>
                <p>✉️ vkcalc.in@gmail.com (Support)</p>
            </div>
        </div>
    );
};

export default FeeBreakdown;
