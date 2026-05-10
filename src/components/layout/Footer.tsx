import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-4 mt-10">
            <div className="text-center space-x-4">
                <Link to="/user-guide">User Guide</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/disclaimer">Disclaimer</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/terms-and-conditions">Terms & Conditions</Link>
                <Link to="/blog">Legal Blog</Link>
                <Link to="/gst-invoice">GST Invoice</Link>
                <Link to="/legal-documents" className="hover:underline">
                    Legal Documents
                </Link>
            </div>
            <p className="text-center text-sm mt-2">
                © {new Date().getFullYear()} SUITCASE - Legal Office Suite®
            </p>
        </footer>
    );
};

export default Footer;

export const PremiumFooter: React.FC<{ onNavigate?: (path: string) => void }> = ({ onNavigate }) => {
    return (
        <footer className="w-full bg-[#050811] text-slate-400 py-24 px-10 relative overflow-hidden border-t border-slate-800">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="w-full relative z-10 px-4 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="flex items-center gap-4 group cursor-pointer">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.3)] group-hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] transition-all duration-500">
                                <span className="text-white font-black italic text-2xl">SU</span>
                            </div>
                            <div>
                                <span className="text-3xl font-black text-white tracking-tighter block leading-none">SUITCASE</span>
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mt-1 block">Complete Legal Office Suite</span>
                            </div>
                        </div>
                        <p className="text-lg text-slate-500 leading-relaxed font-medium max-w-md">
                            Engineered for the modern Indian legal professional. We provide precision legal management tools and advocate-grade resources for chambers and law firms.
                        </p>
                        <div className="flex gap-5">
                            {['fb', 'tw', 'ln', 'yt'].map((social) => (
                                <div key={social} className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 cursor-pointer group shadow-lg">
                                    <div className="w-5 h-5 bg-slate-600 group-hover:bg-white rounded-md transition-colors"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="lg:col-span-2 space-y-10">
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] relative inline-block">
                            Navigation
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-600 rounded-full"></span>
                        </h4>
                        <ul className="space-y-5 text-sm font-bold">
                            <li><button onClick={() => onNavigate?.('home')} className="hover:text-blue-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-slate-700 group-hover:bg-blue-500 rounded-full transition-all"></span> Case Manager</button></li>
                            <li><button onClick={() => onNavigate?.('home')} className="hover:text-blue-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-slate-700 group-hover:bg-blue-500 rounded-full transition-all"></span> Legal Intel Blog</button></li>
                            <li><button onClick={() => onNavigate?.('contact')} className="hover:text-blue-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-slate-700 group-hover:bg-blue-500 rounded-full transition-all"></span> Advocate Advisory</button></li>
                            <li><button onClick={() => onNavigate?.('contact')} className="hover:text-blue-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-slate-700 group-hover:bg-blue-500 rounded-full transition-all"></span> Support Center</button></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-10">
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] relative inline-block">
                            Legal Hub
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-600 rounded-full"></span>
                        </h4>
                        <ul className="space-y-5 text-sm font-bold">
                            <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-slate-700 group-hover:bg-blue-500 rounded-full transition-all"></span> Privacy Protocol</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-slate-700 group-hover:bg-blue-500 rounded-full transition-all"></span> Service Terms</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-slate-700 group-hover:bg-blue-500 rounded-full transition-all"></span> Compliance</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-slate-700 group-hover:bg-blue-500 rounded-full transition-all"></span> Disclaimer</a></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="lg:col-span-4 space-y-10">
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] relative inline-block">
                            Direct Contact
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-600 rounded-full"></span>
                        </h4>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] flex items-center gap-5 hover:border-blue-500/30 transition-all group">
                                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 text-xl font-black group-hover:bg-blue-600 group-hover:text-white transition-all">@</div>
                                <div>
                                    <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Send Inquiry</div>
                                    <div className="text-white font-black">support@suitcase.law</div>
                                </div>
                            </div>
                            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] flex items-center gap-5 hover:border-blue-500/30 transition-all group">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 text-xl font-black group-hover:bg-indigo-600 group-hover:text-white transition-all">#</div>
                                <div>
                                    <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Priority Line</div>
                                    <div className="text-white font-black">+91 98765 43210</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                    <div className="flex items-center gap-4">
                        <span>© 2026 SUITCASE</span>
                        <span className="w-1.5 h-1.5 bg-slate-800 rounded-full"></span>
                        <span>India's First Complete Legal Office Suite</span>
                    </div>
                    <div className="flex items-center gap-10">
                        <span className="flex items-center gap-2.5">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            SYSTEM OPERATIONAL
                        </span>
                        <span className="text-slate-400">DESIGNED BY <span className="text-white">SUITCASE PREMIUM</span></span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
