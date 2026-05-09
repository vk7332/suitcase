import { useNavigate } from "react-router-dom";

export default function Landing() {
    return (
        <div className="min-h-screen bg-white">

            {/* HERO */}
            <section className="text-center py-20">
                <h1 className="text-4xl font-bold mb-4">
                    SUITCASE — Advocate Operating System
                </h1>

                <p className="text-lg mb-6">
                    Manage cases, billing, court fees & clients in one platform
                </p>

                <a
                    href="/pricing"
                    className="bg-blue-600 text-white px-6 py-3"
                >
                    Get Started
                </a>
            </section>

            {/* FEATURES */}
            <section className="grid grid-cols-3 gap-6 p-10">
                <div>⚖️ Case Management</div>
                <div>💰 GST Billing</div>
                <div>📊 Reports</div>
            </section>

        </div>
    );
}

{/* CTA */ }
<section className="text-center py-20">
    <h2 className="text-2xl font-bold mb-4">
        Start your legal practice upgrade today
    </h2>

    <button
        onClick={() => navigate("/pricing")}
        className="bg-black text-white px-6 py-2 rounded"
    >
        View Pricing
    </button>
</section>

        </div >
    );
}