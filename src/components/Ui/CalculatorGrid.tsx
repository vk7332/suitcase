import { Calculator, Home, CreditCard, GraduationCap, PiggyBank, TrendingUp, Percent, DollarSign, Shield, FileText, Tag, Scale, Gavel, FileSignature, Users, Landmark, Zap, ArrowRight, Sparkles } from 'lucide-react';

interface CalculatorGridProps {
    isDark: boolean;
    onNavigate: (page: string) => void; // Add this line
}

const CalculatorGrid: React.FC<CalculatorGridProps> = ({ isDark, onNavigate }) => {
    const sections = [
        {
            id: 'tax-salary',
            title: 'Tax & Salary',
            description: 'Salary, deductions, and regime comparisons',
            icon: <Calculator className="w-5 h-5" />,

            cards: [
                { icon: <Calculator className="w-6 h-6" />, title: 'Income Tax Calc', description: 'Calculate income tax obligation for AY 2024-25', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
                { icon: <Home className="w-6 h-6" />, title: 'HRA Exemption', description: 'Calculate your HRA allowance and benefits', color: 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400' },
                { icon: <DollarSign className="w-6 h-6" />, title: 'Advance Tax', description: 'Calculate advance tax for payments', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
                { icon: <PiggyBank className="w-6 h-6" />, title: 'Gratuity Calculator', description: 'Calculate your gratuity payment', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
                { icon: <Tag className="w-6 h-6" />, title: 'Bonus Calculator', description: 'Calculate statutory bonus as per law', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' },
                { icon: <Percent className="w-6 h-6" />, title: 'TDS Calculator', description: 'Tax Deducted at Source calculator', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' }
            ]
        },
        {
            id: 'emi-loans',
            title: 'EMI & Loans',
            description: 'Loan EMIs and repayment planning',
            icon: <CreditCard className="w-5 h-5" />,
            cards: [
                { icon: <Home className="w-6 h-6" />, title: 'Home Loan EMI', description: 'EMI calculator for home loans', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
                { icon: <CreditCard className="w-6 h-6" />, title: 'Personal Loan EMI', description: 'Calculate EMI rates and tenure options', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' },
                { icon: <CreditCard className="w-6 h-6" />, title: 'Car Loan EMI', description: 'Plan your vehicle purchase', color: 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400' },
                { icon: <GraduationCap className="w-6 h-6" />, title: 'Education Loan', description: 'Calculate education loan EMI', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
                { icon: <PiggyBank className="w-6 h-6" />, title: 'Provident Fund', description: 'PF maturity and withdrawal calculator', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' }
            ]
        },

        {
            id: 'interest-calc',
            title: 'Interest Calculators',
            description: 'SIP, PPF, NPS and investment projections',
            icon: <TrendingUp className="w-5 h-5" />,
            cards: [
                { icon: <TrendingUp className="w-6 h-6" />, title: 'SIP Calculator', description: 'Systematic Investment Plan for 10-30 years', color: 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400' },
                { icon: <DollarSign className="w-6 h-6" />, title: 'Lumpsum', description: 'Calculate returns on one-time investment', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
                { icon: <PiggyBank className="w-6 h-6" />, title: 'PPF Calculator', description: 'Public Provident Fund investments', color: 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400' },
                { icon: <TrendingUp className="w-6 h-6" />, title: 'NPS Calculator', description: 'National Pension Scheme returns', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' },
                { icon: <DollarSign className="w-6 h-6" />, title: 'Sukanya Samriddhi', description: 'Girl child savings scheme calculator', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
                { icon: <Calculator className="w-6 h-6" />, title: 'FD Calculator', description: 'Fixed Deposit Maturity Amount', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' },
                { icon: <PiggyBank className="w-6 h-6" />, title: 'CAGR Calculator', description: 'Compound Annual Growth Rate', color: 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400' },
                { icon: <TrendingUp className="w-6 h-6" />, title: 'Goal Planning', description: 'Plan investments for future goals', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' }
            ]
        },
        {
            id: 'insurance',
            title: 'Insurance & Protection',
            description: 'Protect your family and assets',
            icon: <Shield className="w-5 h-5" />,
            cards: [
                { icon: <Shield className="w-6 h-6" />, title: 'Health Insurance', description: 'Compare premiums and find best coverage', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
                { icon: <Shield className="w-6 h-6" />, title: 'Term Insurance', description: 'Calculate adequate life cover needed', color: 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400' }
            ]
        },
        {
            id: 'gst-business',
            title: 'GST & Business',
            icon: <FileText className="w-5 h-5" />,
            cards: [
                { icon: <Percent className="w-6 h-6" />, title: 'GST Calculator', description: 'Quickly calculate GST & prices', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
                { icon: <TrendingUp className="w-6 h-6" />, title: 'Break-Even Point', description: 'Calculate business profitability threshold', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' }
            ]
        }
    ];


    return (
        <main className="max-w-7xl mx-auto px-6 py-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-blue-800 dark:from-slate-800 dark:to-slate-900 p-8 md:p-12 mb-8 shadow-2xl border border-blue-500/20 dark:border-slate-700">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest mb-6 border border-white/20">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        VK Tax & Law Chamber® • AY 2026-27
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white leading-[1.1] max-w-3xl">
                        Elite <span className="text-blue-200">Financial Suite</span><br />
                        for Modern India
                    </h1>

                    <p className="text-base md:text-lg text-blue-100/80 dark:text-slate-400 mb-8 max-w-2xl font-medium leading-relaxed">
                        Precision-engineered calculators designed for accuracy and professional efficiency.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-3.5 rounded-2xl bg-white text-blue-700 font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 flex items-center gap-3 group">
                            Explore Tools <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* AdSense Space */}
            <div className="mb-8 p-4 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-center">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">AdSense Block - 728 x 90</div>
            </div>

            {/* Court Fees Calculator Banner - PROMINENT & ANIMATED */}
            <div className="mb-16 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
                <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0a061e] border border-white/10 p-8 md:p-12 shadow-2xl">
                    {/* Animated Particles Background */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                    
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-sm animate-bounce-slow">
                                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                                New Tool • Legal Ginni™
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
                                Court Fees <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Calculator</span>
                            </h2>

                            <p className="text-lg text-white/70 mb-8 max-w-xl leading-relaxed font-medium mx-auto lg:mx-0">
                                Calculate court fees instantly for any case — civil, writ, matrimonial, appeals & more. 
                                <span className="text-white block mt-2">Built by VK Tax & Law Chamber® (M.Com, LLB).</span>
                            </p>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                                {[
                                    { icon: <Gavel className="w-4 h-4" />, label: 'Civil Suit' },
                                    { icon: <FileSignature className="w-4 h-4" />, label: 'Writ Petition' },
                                    { icon: <Users className="w-4 h-4" />, label: 'Matrimonial' },
                                    { icon: <Landmark className="w-4 h-4" />, label: 'High Court' }
                                ].map((tag, i) => (
                                    <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 text-xs font-bold hover:bg-white/10 transition-all cursor-default">
                                        {tag.icon}
                                        {tag.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-8 flex-shrink-0">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500 rounded-full blur-[60px] opacity-50 animate-pulse"></div>
                                <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 flex items-center justify-center backdrop-blur-xl group-hover:rotate-12 transition-transform duration-700">
                                    <Scale className="w-20 h-20 md:w-28 md:h-28 text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.6)] animate-pulse" />
                                </div>
                            </div>

                            <button 
                                onClick={() => onNavigate('court-fees')}
                                className="px-12 py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-105 active:scale-95 text-white font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_20px_50px_rgba(37,99,235,0.4)] flex items-center gap-3 group/btn"
                            >
                                Launch Calculator <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                {[
                    { label: 'Financial Tools', value: '60+', icon: <Zap className="w-5 h-5" /> },
                    { label: 'Tool Categories', value: '8', icon: <Landmark className="w-5 h-5" /> },
                    { label: 'Free Forever', value: '100%', icon: <Sparkles className="w-5 h-5" /> },
                    { label: 'Latest Updates', value: 'AY 25-26', icon: <FileText className="w-5 h-5" /> }
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            {stat.icon}
                        </div>
                        <div className="text-3xl font-black text-slate-800 dark:text-white mb-1">{stat.value}</div>
                        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Sections */}
            <div className="space-y-24">
                {sections.map((section) => (
                    <section key={section.id} id={section.id} className="scroll-mt-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="flex items-center justify-between mb-10 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
                                    {section.icon}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">{section.title}</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{section.description}</p>
                                </div>
                            </div>
                            <button className="hidden md:flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:gap-3 transition-all">
                                View All <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {section.cards.map((card, i) => (
                                <div
                                    key={i}
                                    onClick={() => onNavigate('income-tax')}
                                    className="group relative bg-white dark:bg-slate-800 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
                                >
                                    <div className={`absolute top-0 right-0 w-32 h-32 ${card.color.split(' ')[0]} opacity-10 rounded-bl-full group-hover:scale-150 transition-transform duration-700`}></div>
                                    
                                    <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                                        {card.icon}
                                    </div>
                                    
                                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-3 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {card.title}
                                    </h3>
                                    
                                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-6">
                                        {card.description}
                                    </p>

                                    <div className="flex items-center text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                                        Launch Tool <ArrowRight className="w-3 h-3 ml-2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}

export default CalculatorGrid;
