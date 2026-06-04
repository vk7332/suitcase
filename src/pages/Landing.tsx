import { useNavigate, Link } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Header/Navbar */}
            <nav className="flex justify-between items-center px-8 py-6 bg-white shadow-sm sticky top-0 z-50">
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
                    <div className="w-10 h-10 bg-[#089CCE] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">S</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-[#089CCE]">SUITCASE</span>
                </Link>
                <div className="hidden md:flex items-center gap-8 font-medium">
                    <a href="#features" className="hover:text-[#089CCE] transition">Features</a>
                    <a href="/pricing" className="hover:text-[#089CCE] transition">Pricing</a>
                    <button 
                        onClick={() => navigate("/login")}
                        className="text-[#089CCE] font-semibold hover:opacity-80"
                    >
                        Sign In
                    </button>
                    <button 
                        onClick={() => navigate("/role-selection")}
                        className="bg-[#089CCE] text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-[#089CCE]/30 transition transform hover:-translate-y-0.5"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="relative bg-[#089CCE] pt-24 pb-32 px-6 overflow-hidden">
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <div className="inline-block bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                        India's First Complete Legal Office Suite
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
                        Advocate Operating System <br />
                        <span className="text-blue-100">(SUITCASE)</span>
                    </h1>
                    <p className="text-xl text-blue-50 mb-12 max-w-2xl mx-auto leading-relaxed">
                        A premium-quality, complete office suite for Advocates. 
                        Manage cases, billing, court fees & clients in one professional platform.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => navigate("/pricing")}
                            className="bg-white text-[#089CCE] px-10 py-4 rounded-full text-lg font-bold hover:bg-blue-50 transition shadow-xl"
                        >
                            Start Your Free Trial
                        </button>
                        <button 
                            onClick={() => navigate("/login")}
                            className="bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition"
                        >
                            Live Demo
                        </button>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                    <div className="absolute top-1/4 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section id="features" className="py-24 px-6 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features for Modern Law Practices</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to run your chamber efficiently and professionally.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: "⚖️", title: "Case Management", desc: "Track every detail of your cases, from filings to final judgments." },
                            { icon: "💰", title: "GST Billing", desc: "Professional, compliant invoicing for all your legal services." },
                            { icon: "📊", title: "Smart Reports", desc: "Gain deep insights into your practice with automated analytics." }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                                <div className="text-4xl mb-6 group-hover:scale-110 transition transform">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FREE CALCULATORS SECTION */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Free Legal Calculators</h2>
                    <p className="text-gray-600 mb-12">Access our professional legal tools for free, no account required.</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { title: "Court Fee", path: "/calculator/court-fee" },
                            { title: "Limitation", path: "/calculator/limitation" },
                            { title: "Stamp Duty", path: "/calculator/stamp-duty" },
                            { title: "Interest", path: "/calculator/interest" },
                            { title: "Filing Cost", path: "/calculator/filing-cost" },
                            { title: "Total Case Cost", path: "/calculator/total-case-cost" },
                            { title: "Partition Suit", path: "/calculator/partition-suit" },
                            { title: "Specific Performance", path: "/calculator/specific-performance" }
                        ].map((calc, i) => (
                            <button
                                key={i}
                                onClick={() => navigate(calc.path)}
                                className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#089CCE] hover:bg-blue-50/50 transition-all text-center group"
                            >
                                <div className="text-[#089CCE] font-bold group-hover:scale-105 transition transform">{calc.title}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* TRUST SECTION */}
            <section className="py-20 bg-white px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-12">Built by VK Tax & Law Chamber®</h2>
                    <div className="bg-gray-50 p-8 rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-700 italic text-lg leading-relaxed">
                            "SUITCASE was designed to address the specific needs of the Indian legal ecosystem. 
                            It's not just software; it's an operating system for your professional growth."
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto bg-[#089CCE] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-200">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 relative z-10">
                        Start your legal practice upgrade today
                    </h2>
                    <button
                        onClick={() => navigate("/pricing")}
                        className="bg-white text-[#089CCE] px-12 py-4 rounded-full text-xl font-extrabold hover:shadow-2xl transition transform hover:-translate-y-1 relative z-10"
                    >
                        Upgrade to SUITCASE
                    </button>
                    
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-10 -mb-10"></div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 px-6 border-t border-gray-100 bg-white">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
                        <div className="w-8 h-8 bg-[#089CCE] rounded flex items-center justify-center">
                            <span className="text-white font-bold text-sm">S</span>
                        </div>
                        <span className="font-bold text-gray-900 tracking-tight">SUITCASE</span>
                    </Link>
                    <div className="flex gap-8 text-sm text-gray-500">
                        <button onClick={() => navigate("/privacy")} className="hover:text-[#089CCE]">Privacy Policy</button>
                        <button onClick={() => navigate("/terms")} className="hover:text-[#089CCE]">Terms of Service</button>
                        <button onClick={() => navigate("/contact")} className="hover:text-[#089CCE]">Contact Us</button>
                    </div>
                    <p className="text-sm text-gray-400">© 2026 SUITCASE LegalTech Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
