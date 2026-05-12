import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: any) {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
        });
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen">

            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-100 flex flex-col">
                <div className="p-8">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 bg-[#089CCE] rounded-lg flex items-center justify-center text-white font-bold">
                            S
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900">SUITCASE</span>
                    </div>

                    <nav className="flex flex-col gap-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-3">Main Menu</p>
                        <Link to="/dashboard" className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-[#089CCE] transition">Dashboard</Link>
                        <Link to="/advocate/cases" className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-[#089CCE] transition">My Cases</Link>
                        <Link to="/advocate/clients" className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-[#089CCE] transition">Client List</Link>
                        
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-6 mb-2 px-3">Legal Tools</p>
                        <Link to="/calculator/court-fee" className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-[#089CCE] transition">Court Fee</Link>
                        <Link to="/calculator/limitation" className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-[#089CCE] transition">Limitation</Link>
                        <Link to="/calculator/stamp-duty" className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-[#089CCE] transition">Stamp Duty</Link>
                        <Link to="/calculator/interest" className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-[#089CCE] transition">Interest Calc</Link>
                        <Link to="/calculator/filing-cost" className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-[#089CCE] transition">Filing Cost</Link>
                        <Link to="/calculator/partition-suit" className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-[#089CCE] transition">Partition Suit</Link>
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-gray-50">
                    {user ? (
                        <div className="flex flex-col gap-3">
                            <div className="px-3">
                                <p className="text-xs font-bold text-gray-900 truncate">{user.email}</p>
                                <p className="text-[10px] text-gray-500">Premium Account</p>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="w-full text-left px-3 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <button 
                                onClick={() => navigate("/login")}
                                className="w-full bg-[#089CCE] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#078bb8] transition"
                            >
                                Sign In
                            </button>
                            <p className="text-[10px] text-center text-gray-400">Unlock more features</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-50/50">
                {children}
            </div>

        </div>
    );
}


