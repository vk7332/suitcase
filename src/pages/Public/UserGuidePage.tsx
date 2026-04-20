import React from "react";

const UserGuidePage: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">
            <h1 className="text-3xl font-bold mb-4 text-blue-700">
                📘 User Guide – SUITCASE
            </h1>

            <p className="mb-4 text-gray-700">
                Welcome to <strong>SUITCASE – Court Fee & Case Manager Suite</strong>,
                a comprehensive practice management software designed for advocates,
                law firms, and legal professionals.
            </p>

            <h2 className="text-xl font-semibold mt-4">🔐 1. Login & Registration</h2>
            <ul className="list-disc ml-6 text-gray-700">
                <li>Register using your email and password.</li>
                <li>Verify your account via email.</li>
                <li>Log in securely using Supabase authentication.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4">📂 2. Client Management</h2>
            <ul className="list-disc ml-6 text-gray-700">
                <li>Add, edit, and manage client records.</li>
                <li>Track contact details and case associations.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4">⚖️ 3. Case Management</h2>
            <ul className="list-disc ml-6 text-gray-700">
                <li>Create and manage cases.</li>
                <li>Track hearing dates and case status.</li>
                <li>Maintain a digital case diary.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4">🧮 4. Court Fee Calculator</h2>
            <ul className="list-disc ml-6 text-gray-700">
                <li>Calculate court fees for multiple states.</li>
                <li>Generate professional PDF reports.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4">📄 5. Invoice & Payments</h2>
            <ul className="list-disc ml-6 text-gray-700">
                <li>Create professional fee invoices.</li>
                <li>Accept payments through Razorpay.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4">🔔 6. Reminders & Notifications</h2>
            <ul className="list-disc ml-6 text-gray-700">
                <li>Receive alerts for upcoming hearings.</li>
                <li>Enable WhatsApp and email reminders.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4">🤝 7. Affiliate Program</h2>
            <ul className="list-disc ml-6 text-gray-700">
                <li>Share your referral link.</li>
                <li>Earn commissions on successful subscriptions.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4">📱 8. Mobile Access</h2>
            <p className="text-gray-700">
                Access SUITCASE via web or Android application for seamless practice
                management.
            </p>

            <p className="mt-6 text-gray-600 font-medium">
                For assistance, please visit the Contact Us page.
            </p>
        </div>
    );
};

export default UserGuidePage;


