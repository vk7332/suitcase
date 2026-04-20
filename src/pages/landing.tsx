import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">

            {/* HERO */}
            <section className="text-center py-20 px-6">
                <h1 className="text-4xl font-bold mb-4">
                    India’s First Advocate Operating System
                </h1>

                <p className="text-gray-600 mb-6">
                    Manage cases, clients, documents & court fees — all in one platform.
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => navigate("/pricing")}
                        className="bg-black text-white px-6 py-2 rounded"
                    >
                        Start Free Trial
                    </button>

                    <button className="border px-6 py-2 rounded">
                        View Demo
                    </button>
                </div>
            </section>

            {/* FEATURES */}
            <section className="grid md:grid-cols-3 gap-6 px-10 py-10">
                {[
                    "Court Fee Calculator",
                    "Case Management",
                    "Client Portal",
                    "Secure Documents",
                    "Real-time Updates",
                    "Invoice System",
                ].map((f) => (
                    <div key={f} className="border p-6 rounded text-center">
                        <h3 className="font-semibold">{f}</h3>
                    </div>
                ))}
            </section>

            {/* CTA */}
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

        </div>
    );
}