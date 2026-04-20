import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, HelpCircle, User, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
        isPractitioner: 'No',
        interest: 'Income Tax'
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const inputClasses = "w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-8 focus:ring-blue-500/10 focus:border-blue-600 transition-all shadow-sm placeholder:text-slate-400";
    const labelClasses = "block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 ml-2";

    return (
        <div className="max-w-6xl mx-auto space-y-16 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] shadow-sm">
                    <MessageSquare size={14} /> Direct Assistance Hub
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                    Get in Touch with <span className="text-blue-600">VK Specialists</span>
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed">
                    Have a complex tax query or need technical support? Our elite team is ready to assist you with precision and speed.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Contact Information */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white dark:bg-slate-800/50 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl space-y-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        
                        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight pb-4 border-b-4 border-blue-600 inline-block">Support Channels</h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-5 group/item">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Us</p>
                                    <p className="text-sm font-black text-slate-900 dark:text-white">support@vkcalc.in</p>
                                    <p className="text-xs text-slate-500 font-bold mt-1">Avg response: 2 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 group/item">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Call Priority Line</p>
                                    <p className="text-sm font-black text-slate-900 dark:text-white">+91 98765 43210</p>
                                    <p className="text-xs text-slate-500 font-bold mt-1">Mon-Sat, 9am - 7pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 group/item">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Corporate HQ</p>
                                    <p className="text-sm font-black text-slate-900 dark:text-white">Financial District, New Delhi, India</p>
                                    <p className="text-xs text-slate-500 font-bold mt-1">Appointment only</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 mt-8 border-t border-slate-100 dark:border-slate-800">
                            <div className="bg-slate-900 p-6 rounded-2xl text-white">
                                <div className="flex items-center gap-3 mb-4">
                                    <ShieldCheck className="text-emerald-400" size={18} />
                                    <span className="text-xs font-black uppercase tracking-widest">Data Privacy Locked</span>
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                                    All inquiries are handled with strict CA-standard confidentiality. Your financial data is encrypted and never shared.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Questionnaire Form */}
                <div className="lg:col-span-8">
                    <div className="bg-white dark:bg-slate-800/50 p-10 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl relative">
                        {isSubmitted ? (
                            <div className="py-20 text-center space-y-6 animate-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                    <CheckCircle size={40} />
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white">Inquiry Received!</h3>
                                <p className="text-slate-500 dark:text-slate-400 font-bold max-w-sm mx-auto">
                                    Our specialists have been notified. You will receive a response at <span className="text-blue-600">{formData.email}</span> shortly.
                                </p>
                                <button 
                                    onClick={() => setIsSubmitted(false)}
                                    className="px-8 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:scale-105"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2 group">
                                        <label className={labelClasses}><User size={12} className="inline mr-1" /> Full Name</label>
                                        <input 
                                            required
                                            type="text" 
                                            className={inputClasses} 
                                            placeholder="Your name..."
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className={labelClasses}><Mail size={12} className="inline mr-1" /> Email Address</label>
                                        <input 
                                            required
                                            type="email" 
                                            className={inputClasses} 
                                            placeholder="you@example.com..."
                                            value={formData.email}
                                            onChange={e => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className={labelClasses}><Phone size={12} className="inline mr-1" /> Phone Number</label>
                                        <input 
                                            type="tel" 
                                            className={inputClasses} 
                                            placeholder="+91 00000 00000..."
                                            value={formData.phone}
                                            onChange={e => setFormData({...formData, phone: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className={labelClasses}><HelpCircle size={12} className="inline mr-1" /> Area of Interest</label>
                                        <select 
                                            className={inputClasses}
                                            value={formData.interest}
                                            onChange={e => setFormData({...formData, interest: e.target.value})}
                                        >
                                            <option>Income Tax Planning</option>
                                            <option>Capital Gains Audit</option>
                                            <option>Business Compliance</option>
                                            <option>Technical Support</option>
                                            <option>Other Services</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-4">
                                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                                        <div>
                                            <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-1">Are you a Tax Professional/CA?</p>
                                            <p className="text-[10px] text-slate-500 font-bold">Specialized APIs and tools available for practitioners.</p>
                                        </div>
                                        <div className="flex gap-2">
                                            {['Yes', 'No'].map(opt => (
                                                <button 
                                                    key={opt}
                                                    type="button"
                                                    onClick={() => setFormData({...formData, isPractitioner: opt})}
                                                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.isPractitioner === opt ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'}`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2 group">
                                        <label className={labelClasses}><Send size={12} className="inline mr-1" /> Your Message / Query</label>
                                        <textarea 
                                            required
                                            rows={5}
                                            className={`${inputClasses} resize-none`}
                                            placeholder="Describe your situation or query in detail..."
                                            value={formData.message}
                                            onChange={e => setFormData({...formData, message: e.target.value})}
                                        ></textarea>
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-[0.98]"
                                >
                                    <Send size={18} /> Submit Formal Inquiry
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


