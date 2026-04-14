import React from "react";

const DisclaimerPage: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">
            <h1 className="text-3xl font-bold text-red-600 mb-4">
                ⚖️ Disclaimer
            </h1>

            <p className="text-gray-700 mb-4">
                The calculators and tools provided in
                <strong> SUITCASE – Court Fee & Case Manager Suite </strong>
                are designed for informational and assistive purposes only.
            </p>

            <p className="text-gray-700 mb-4">
                Court fee calculations are based on applicable statutes, rules,
                and available data. However, they are subject to confirmation by
                the relevant courts and authorities.
            </p>

            <p className="text-gray-700 mb-4 font-semibold">
                The publisher shall not be held liable for any discrepancy,
                loss, or damage arising from reliance on these calculations.
            </p>

            <h2 className="text-xl font-semibold mt-4">
                📌 Professional Advice
            </h2>
            <p className="text-gray-700 mb-4">
                Users are advised to verify all results independently before
                filing any legal documents.
            </p>

            <h2 className="text-xl font-semibold mt-4">🔗 External Links</h2>
            <p className="text-gray-700">
                This application may contain links to third-party websites such as
                eCourts and Amazon. We are not responsible for the content or
                accuracy of such external resources.
            </p>

            <p className="mt-6 text-gray-600">
                © {new Date().getFullYear()} VK Tax & Law Chamber®. All rights reserved.
            </p>
        </div>
    );
};

export default DisclaimerPage;
