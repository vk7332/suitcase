import React from "react";

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto px-6 py-10 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-blue-700 mb-4">
                Privacy Policy
            </h1>
            <p className="text-gray-600 mb-6">
                <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
            </p>

            <p className="mb-4">
                This Privacy Policy describes how <strong>SUITCASE – Court Fee & Case
                    Manager Suite</strong> collects, uses, and protects user information.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                1. Developer Information
            </h2>
            <ul className="list-disc ml-6">
                <li><strong>Name:</strong> Vipin Kumar</li>
                <li><strong>Email:</strong> vk7332@gmail.com</li>
                <li><strong>Phone:</strong> 7018064385</li>
                <li><strong>Enrollment Number:</strong> HIM/75/2012</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                2. Information We Collect
            </h2>
            <ul className="list-disc ml-6">
                <li>Personal details such as name, email, and phone number.</li>
                <li>Case and client data entered by users.</li>
                <li>Uploaded legal documents.</li>
                <li>Payment and subscription details processed via Razorpay.</li>
                <li>Technical information such as IP address and device type.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                3. How We Use Your Information
            </h2>
            <ul className="list-disc ml-6">
                <li>To provide and maintain our services.</li>
                <li>To process payments and subscriptions.</li>
                <li>To generate reports and invoices.</li>
                <li>To send reminders and notifications.</li>
                <li>To improve user experience and security.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                4. Third-Party Services
            </h2>
            <p>
                We may use trusted third-party services such as Supabase, Razorpay,
                Google Play Services, Amazon Affiliate Program, and eCourts.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">5. Data Security</h2>
            <p>
                We implement industry-standard measures to protect your data. However,
                no digital system is completely secure.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">6. User Rights</h2>
            <p>
                Users may request access, correction, or deletion of their personal
                data by contacting us at vk7332@gmail.com.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                7. Changes to This Policy
            </h2>
            <p>
                We reserve the right to update this Privacy Policy at any time.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h2>
            <p>
                <strong>Vipin Kumar</strong><br />
                Email: vk7332@gmail.com<br />
                Phone: 7018064385
            </p>

            <p className="mt-8 text-gray-500">
                © {new Date().getFullYear()} SUITCASE – Court Fee & Case Manager Suite.
                All rights reserved.
            </p>
        </div>
    );
};

export default PrivacyPolicyPage;
