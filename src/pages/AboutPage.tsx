import React from 'react';
import { User, Briefcase, GraduationCap, Award, Book, PenTool, Globe, Mail, Phone } from 'lucide-react';

const AboutPage: React.FC = () => (
    <div className="max-w-6xl mx-auto space-y-20 py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Hero Section */}
        <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[11px] font-black uppercase tracking-[0.4em] shadow-sm">
                <Globe className="w-5 h-5" /> VK Tax & Law Chamber®
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                Elite Financial <span className="text-blue-600">& Legal</span> Suite
            </h1>
            <p className="text-2xl text-slate-500 dark:text-slate-400 font-bold max-w-3xl mx-auto leading-relaxed italic">
                "Precision, Integrity, and Excellence in every calculation."
            </p>
        </div>

        {/* Founder Bio Section */}
        <div className="bg-white dark:bg-slate-800/50 p-10 md:p-20 rounded-[4rem] border-2 border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
                <div className="lg:col-span-4 space-y-8 text-center lg:text-left">
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 mx-auto lg:mx-0 flex items-center justify-center text-white text-7xl font-black shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500 border-8 border-white dark:border-slate-700">
                        VK
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">VIPIN KUMAR TAMRA</h2>
                        <p className="text-blue-600 font-black uppercase tracking-widest text-xs">Founder • Advocate • Tax Expert</p>
                    </div>
                    <div className="flex justify-center lg:justify-start gap-4">
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                            <Mail size={20} />
                        </div>
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                            <Briefcase size={20} />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-10">
                    <div className="space-y-6">
                        <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
                            <span className="w-1.5 h-12 bg-blue-600 rounded-full"></span>
                            A Decade of Expertise
                        </h3>
                        <p className="text-lg text-slate-600 dark:text-slate-300 font-bold leading-relaxed">
                            I have adequate qualifications (M.Com & LLB.) and have more than more than ten years’ experience in the maintenance of accounts, filing ITR and also practicing as an advocate for the last ten years. "Commerce" is my main subject after matric to M.Com.
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-300 font-bold leading-relaxed">
                            I was also Assistant Professor (Commerce) wef June, 2015 to April 2017 at Government Degree College as Temporary (Guest) Faculty. I have a one-year computer diploma including MS Office, Tally ERP9 with typing speed 30 wpm.
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-300 font-bold leading-relaxed">
                            I am expert in drafting, editing, designing, painting, analysis and typing of papers online & offline. I feel myself to understand most of the practical problems in the field of accounts, commerce, economics, finance, management, and laws.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-start gap-5 group/card hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm">
                            <GraduationCap className="text-blue-600 mt-1" size={28} />
                            <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Education</h4>
                                <p className="text-sm font-black text-slate-900 dark:text-white">LLB & M.Com (Advanced Commerce)</p>
                            </div>
                        </div>
                        <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-start gap-5 group/card hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm">
                            <Award className="text-emerald-600 mt-1" size={28} />
                            <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Experience</h4>
                                <p className="text-sm font-black text-slate-900 dark:text-white">10+ Years Legal & Tax Practice</p>
                            </div>
                        </div>
                        <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-start gap-5 group/card hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm">
                            <Book className="text-amber-600 mt-1" size={28} />
                            <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Academia</h4>
                                <p className="text-sm font-black text-slate-900 dark:text-white">Former Assistant Professor (Commerce)</p>
                            </div>
                        </div>
                        <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-start gap-5 group/card hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm">
                            <PenTool className="text-indigo-600 mt-1" size={28} />
                            <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Technical</h4>
                                <p className="text-sm font-black text-slate-900 dark:text-white">Drafting & Tally ERP9 Specialist</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Community Section */}
        <div className="text-center space-y-12">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Meet the Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                <div className="p-10 bg-white dark:bg-slate-800 p-10 rounded-[3rem] border-2 border-slate-100 dark:border-slate-800 shadow-xl group hover:border-blue-500 transition-all">
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white text-3xl font-black">VK</div>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">VIPIN KUMAR TAMRA</h4>
                    <p className="text-sm font-bold text-slate-500">Founder, Tax & Law Expert</p>
                </div>
                <div className="p-10 bg-white dark:bg-slate-800 p-10 rounded-[3rem] border-2 border-slate-100 dark:border-slate-800 shadow-xl group hover:border-emerald-500 transition-all">
                    <div className="w-20 h-20 bg-emerald-600 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white">
                        <User size={32} />
                    </div>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">VKCalc.in Community</h4>
                    <p className="text-sm font-bold text-slate-500">Contributors & Global Users</p>
                </div>
            </div>
        </div>

        {/* Footer info from original */}
        <div className="pt-20 border-t-4 border-slate-100 dark:border-slate-800 text-center space-y-8">
            <p className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.2em] text-xs">
                VKCALC.IN • VERSION 2026.04.04 • BUILT FOR PRECISION
            </p>
            <div className="flex justify-center gap-10">
                <a href="https://wa.me/917018064385" className="flex items-center gap-3 text-lg font-black text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                    <span className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center"><Phone size={20} /></span>
                    WhatsApp Specialist
                </a>
                <a href="mailto:vkcalc.in@gmail.com" className="flex items-center gap-3 text-lg font-black text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                    <span className="w-10 h-10 bg-pink-500 text-white rounded-xl flex items-center justify-center"><Mail size={20} /></span>
                    Email Chamber
                </a>
            </div>
        </div>
    </div>
);

export default AboutPage;


