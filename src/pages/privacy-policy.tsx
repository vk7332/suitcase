import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6 leading-relaxed">
            <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-xl p-12 border border-gray-100">
                <button onClick={() => navigate(-1)} className="text-[#089CCE] font-medium mb-8 hover:underline">← Back</button>
                
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Privacy Policy</h1>
                
                <div className="space-y-8 text-gray-700">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                        <p>SUITCASE collects information necessary to provide our legal office suite services, including name, email, mobile number, and Advocate Enrollment Number. Your Enrollment Number is used as a unique identifier to maintain account integrity and prevent misuse of trial services.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of Data</h2>
                        <p>Data collected is used to personalize your experience, manage case records, process professional billing, and provide technical support. We do not sell your personal or case-related data to third parties.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Security</h2>
                        <p>We implement industry-standard security measures, including database hardening and encrypted connections, to protect the confidentiality of your legal practice records.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Enrollment Number Policy</h2>
                        <p>Enrollment numbers are locked to a single account forever to prevent trial abuse. Duplicate enrollment number registrations are strictly prohibited.</p>
                    </section>

                    <section className="pt-8 border-t border-gray-100">
                        <p className="text-sm text-gray-500">Last Updated: May 2026</p>
                        <p className="text-sm text-gray-500">Developed by: VIPIN KUMAR TAMRA, Mandi, H.P.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
