import React from "react";

const AboutUsPage: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">
            <h1 className="text-3xl font-bold text-blue-700 mb-4">🏢 About Us</h1>

            <p className="text-gray-700 mb-4">
                <strong>SUITCASE – Court Fee & Case Manager Suite</strong> is an
                innovative legal practice management software designed to simplify
                and modernize the workflow of advocates, law firms, and legal
                professionals across India.
            </p>

            <p className="text-gray-700 mb-4">
                Developed by <strong>VK Tax & Law Chamber®</strong>, this platform
                integrates financial calculators, case management tools, court fee
                calculators, legal drafting utilities, and automation features into a
                single ecosystem.
            </p>

            <h2 className="text-xl font-semibold mt-4">🎯 Our Mission</h2>
            <p className="text-gray-700">
                To empower legal professionals with smart, accurate, and efficient
                digital solutions that enhance productivity and reduce manual effort.
            </p>

            <h2 className="text-xl font-semibold mt-4">🌟 Our Vision</h2>
            <p className="text-gray-700">
                To become India’s leading Advocate Operating System and a global
                benchmark for legal technology innovation.
            </p>

            <h2 className="text-xl font-semibold mt-4">👨‍⚖️ Founder</h2>
            <p className="text-gray-700">
                <strong>Vipin Kumar (M.Com., LL.B.)</strong><br />
                Advocate, Tax Practitioner, and Legal Tech Innovator.<br />
                Founder of VK Tax & Law Chamber®.
            </p>
        </div>
    );
};

export default AboutUsPage;
