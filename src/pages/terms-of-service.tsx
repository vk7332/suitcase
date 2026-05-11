import { useNavigate } from "react-router-dom";

export default function TermsOfService() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6 leading-relaxed">
            <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-xl p-12 border border-gray-100">
                <button onClick={() => navigate(-1)} className="text-[#089CCE] font-medium mb-8 hover:underline">← Back</button>
                
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Terms of Service</h1>
                
                <div className="space-y-8 text-gray-700">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                        <p>By using SUITCASE, you agree to comply with these terms. This platform is designed specifically for legal professionals practicing in India.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Account Responsibility</h2>
                        <p>Advocates must provide valid Enrollment Numbers during registration. Providing false information or attempting to create multiple accounts using different mobile numbers for trial purposes is a violation of these terms.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Professional Use</h2>
                        <p>SUITCASE is a tool to assist in practice management. While we provide automated calculators (e.g., Court Fees), advocates are responsible for verifying all outputs before official filings.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Termination</h2>
                        <p>We reserve the right to suspend accounts found attempting to circumvent trial limits or violating the enrollment number locking policy.</p>
                    </section>

                    <section className="pt-8 border-t border-gray-100">
                        <p className="text-sm text-gray-500">Contact: suitcaselegalos@gmail.com</p>
                        <p className="text-sm text-gray-500">Developer: VK Tax & Law Chamber®, Mandi</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
