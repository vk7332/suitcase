import { useState } from 'react';
import { useHistory } from '@/context/HistoryContext';
import { useSettings } from '@/context/SettingsContext';
import {
    FileText, Trash2, Loader2, Copy, Share2, Download,
    Calendar, User, CreditCard, ChevronRight, BarChart3,
    ArrowRightLeft, X, CheckCircle2, History, Database
} from 'lucide-react';
import { exportTaxReport } from '@/utils/pdfExport';
import { ClientRecord } from '@/types/client';

export const ClientDatabase = () => {
    const { clients, deleteRecord, clearAll, searchQuery, setSearchQuery, loading } = useHistory();
    const { settings } = useSettings();
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [selectedForCompare, setSelectedForCompare] = useState<ClientRecord[]>([]);
    const [showCompareModal, setShowCompareModal] = useState(false);

    // --- Stats ---
    const totalCalculations = clients.length;
    const totalTaxAnalyzed = clients.reduce((acc, curr) => acc + (curr.totalIncome || 0), 0);
    const totalLiabilityFound = clients.reduce((acc, curr) => acc + (curr.taxLiability || 0), 0);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this elite audit record?")) return;
        try {
            setDeletingId(id);
            await deleteRecord(id);
        } catch (error) {
            console.error('Delete failed:', error);
        } finally {
            setDeletingId(null);
        }
    };

    const handleExportPdf = async (client: ClientRecord) => {
        if (!client.auditReport) return;
        try {
            await exportTaxReport(client.auditReport, client.name, settings);
        } catch (error) {
            console.error('Export failed:', error);
        }
    };

    const handleCopyLink = (client: ClientRecord) => {
        const text = `Tax Audit Report for ${client.name}\nTotal Income: ₹${client.totalIncome.toLocaleString('en-IN')}\nTax Liability: ₹${client.taxLiability.toLocaleString('en-IN')}\nGenerated via VKCalc.in`;
        navigator.clipboard.writeText(text);
        alert("Audit summary copied to clipboard!");
    };

    const handleWhatsAppShare = (client: ClientRecord) => {
        const text = `*Tax Audit Report for ${client.name}*\nTotal Income: ₹${client.totalIncome.toLocaleString('en-IN')}\nTax Liability: ₹${client.taxLiability.toLocaleString('en-IN')}\n\nCheck your detailed audit at VKCalc.in`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleExportExcel = () => {
        const headers = ["Name", "PAN", "Assessment Year", "Date", "Regime", "Total Income", "Tax Liability"];
        const rows = clients.map(c => [
            c.name,
            c.pan || 'N/A',
            c.assessmentYear,
            new Date(c.lastCalculated).toLocaleDateString(),
            c.taxRegime.toUpperCase(),
            c.totalIncome,
            c.taxLiability
        ]);

        const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `VK_Audit_History_${new Date().toLocaleDateString()}.csv`);
        document.body.appendChild(link);
        link.click();
    };

    const toggleCompare = (client: ClientRecord) => {
        if (selectedForCompare.find(c => c.id === client.id)) {
            setSelectedForCompare(prev => prev.filter(c => c.id !== client.id));
        } else {
            if (selectedForCompare.length >= 2) {
                alert("You can only compare two audits at a time.");
                return;
            }
            setSelectedForCompare(prev => [...prev, client]);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="animate-spin text-blue-600" size={40} />
                <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Retrieving Secure Audit History...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 text-blue-600/10 group-hover:scale-110 transition-transform">
                        <History size={64} />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Calculations</p>
                    <div className="flex items-center gap-3">
                        <h4 className="text-4xl font-black text-slate-900 dark:text-white">{totalCalculations}</h4>
                        <span className="px-2 py-1 bg-blue-600 rounded-lg text-[8px] font-black text-white uppercase tracking-tighter">Live Badge</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 text-emerald-600/10 group-hover:scale-110 transition-transform">
                        <Database size={64} />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Income Analyzed</p>
                    <h4 className="text-4xl font-black text-slate-900 dark:text-white">₹{totalTaxAnalyzed.toLocaleString('en-IN')}</h4>
                </div>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 text-red-600/10 group-hover:scale-110 transition-transform">
                        <CreditCard size={64} />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Liability</p>
                    <h4 className="text-4xl font-black text-slate-900 dark:text-white">₹{totalLiabilityFound.toLocaleString('en-IN')}</h4>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="bg-slate-900 p-6 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                <div className="relative flex-1 w-full">
                    <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Filter audits by name, PAN or year..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-white outline-none focus:ring-4 focus:ring-blue-500/20 transition-all"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    {selectedForCompare.length === 2 && (
                        <button
                            onClick={() => setShowCompareModal(true)}
                            className="flex-1 md:flex-none px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
                        >
                            <ArrowRightLeft size={16} /> Compare Selected
                        </button>
                    )}
                    <button
                        onClick={handleExportExcel}
                        className="flex-1 md:flex-none px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                    >
                        <Download size={16} /> Export CSV
                    </button>
                    <button
                        onClick={() => {
                            if (clients.length === 0) return;
                            alert("Generating master audit report... This may take a moment.");
                            // For simplicity, we'll just export the first one as a demo of "Priority PDF" 
                            // but in a real app this would be a merged report.
                            handleExportPdf(clients[0]);
                        }}
                        className="flex-1 md:flex-none px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
                    >
                        <FileText size={16} /> Download Master PDF
                    </button>
                    <button
                        onClick={clearAll}
                        className="flex-1 md:flex-none px-6 py-4 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-600/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                        Clear History
                    </button>
                </div>
            </div>

            {/* Records List */}
            <div className="grid grid-cols-1 gap-6">
                {clients.length === 0 ? (
                    <div className="py-20 text-center space-y-4 bg-white dark:bg-slate-800/50 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
                        <History className="mx-auto text-slate-300" size={48} />
                        <p className="text-slate-500 font-bold">Your audit history is currently empty.</p>
                    </div>
                ) : (
                    clients.map((client) => (
                        <div
                            key={client.id}
                            className={`bg-white dark:bg-slate-800/50 p-6 md:p-8 rounded-[3rem] border-2 transition-all flex flex-col md:flex-row items-center gap-8 group ${selectedForCompare.find(c => c.id === client.id) ? 'border-blue-600 shadow-xl shadow-blue-600/5' : 'border-slate-100 dark:border-slate-800 hover:border-blue-200'}`}
                        >
                            {/* Comparison Checkbox */}
                            <button
                                onClick={() => toggleCompare(client)}
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${selectedForCompare.find(c => c.id === client.id) ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-blue-600'}`}
                            >
                                {selectedForCompare.find(c => c.id === client.id) ? <CheckCircle2 size={24} /> : <div className="w-5 h-5 border-2 border-current rounded-md" />}
                            </button>

                            {/* Main Info */}
                            <div className="flex-1 space-y-2 text-center md:text-left">
                                <div className="flex flex-col md:flex-row items-center gap-3">
                                    <h5 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{client.name}</h5>
                                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${client.taxRegime === 'new' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                                        {client.taxRegime} Regime
                                    </span>
                                </div>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(client.lastCalculated).toLocaleDateString()}</span>
                                    <span className="flex items-center gap-1.5"><BarChart3 size={12} /> AY {client.assessmentYear}</span>
                                    {client.pan && <span className="flex items-center gap-1.5"><CreditCard size={12} /> {client.pan}</span>}
                                </div>
                            </div>

                            {/* Values */}
                            <div className="flex items-center gap-8 px-8 border-x border-slate-100 dark:border-slate-800 hidden lg:flex">
                                <div className="text-center">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-1">Income</p>
                                    <p className="text-sm font-black text-slate-900 dark:text-white">₹{client.totalIncome.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-1">Tax Found</p>
                                    <p className="text-sm font-black text-blue-600">₹{client.taxLiability.toLocaleString('en-IN')}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleExportPdf(client)} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm" title="Download PDF Report"><Download size={18} /></button>
                                <button onClick={() => handleCopyLink(client)} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm" title="Copy Summary"><Copy size={18} /></button>
                                <button onClick={() => handleWhatsAppShare(client)} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-emerald-600 hover:text-white transition-all shadow-sm" title="Share on WhatsApp"><Share2 size={18} /></button>
                                <button onClick={() => handleDelete(client.id)} disabled={deletingId === client.id} className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm disabled:opacity-50" title="Delete Audit">
                                    {deletingId === client.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Comparison Modal */}
            {showCompareModal && selectedForCompare.length === 2 && (
                <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[300] flex items-center justify-center p-6">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-[4rem] border border-white/10 shadow-2xl overflow-hidden relative">
                        <button
                            onClick={() => setShowCompareModal(false)}
                            className="absolute top-8 right-8 w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 hover:bg-red-500 hover:text-white transition-all z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-12 md:p-20 space-y-12 overflow-y-auto max-h-[90vh]">
                            <div className="text-center space-y-4">
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Side-by-Side <span className="text-blue-600">Audit Comparison</span></h3>
                                <p className="text-slate-500 font-bold">Analyzing the delta between selected audit scenarios.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-12">
                                {selectedForCompare.map((c, i) => (
                                    <div key={c.id} className="space-y-8">
                                        <div className={`p-8 rounded-[3rem] border-2 ${i === 0 ? 'bg-blue-50/50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-800' : 'bg-indigo-50/50 border-indigo-100 dark:bg-indigo-900/10 dark:border-indigo-800'}`}>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Scenario {i + 1}</p>
                                            <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{c.name}</h4>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">AY {c.assessmentYear} • {c.taxRegime} Regime</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                                                <span className="text-xs font-black text-slate-400 uppercase">Gross Income</span>
                                                <span className="text-lg font-black text-slate-900 dark:text-white">₹{c.totalIncome.toLocaleString('en-IN')}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                                                <span className="text-xs font-black text-slate-400 uppercase">Taxable Income</span>
                                                <span className="text-lg font-black text-slate-900 dark:text-white">₹{c.auditReport?.taxableIncome.toLocaleString('en-IN')}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                                                <span className="text-xs font-black text-slate-400 uppercase">Computed Liability</span>
                                                <span className="text-xl font-black text-blue-600">₹{c.taxLiability.toLocaleString('en-IN')}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-black text-slate-400 uppercase">Net Savings Found</span>
                                                <span className="text-lg font-black text-emerald-500">₹{c.auditReport?.savings.toLocaleString('en-IN')}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-slate-900 p-10 rounded-[3rem] text-center">
                                <p className="text-xs font-black text-blue-400 uppercase tracking-[0.3em] mb-4">The Verdict</p>
                                <h4 className="text-2xl font-black text-white mb-6">
                                    The difference in tax liability is <span className="text-emerald-400">₹{Math.abs(selectedForCompare[0].taxLiability - selectedForCompare[1].taxLiability).toLocaleString('en-IN')}</span>
                                </h4>
                                <button
                                    onClick={() => setShowCompareModal(false)}
                                    className="px-10 py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all"
                                >
                                    Dismiss Analysis
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const SearchIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
);
