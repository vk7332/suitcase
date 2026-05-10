import { useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";

export default function StepRole({ next }: any) {
    const [loading, setLoading] = useState<string | null>(null);

    const roles = [
        { id: "advocate", title: "Advocate", icon: "⚖️", desc: "For legal practitioners and chamber heads" },
        { id: "client", title: "Client", icon: "👤", desc: "For tracking your cases and legal documents" },
        { id: "junior advocates", title: "Junior Advocate", icon: "🎓", desc: "For associate lawyers in a chamber" },
        { id: "staff(clerks)", title: "Staff / Clerk", icon: "📋", desc: "For administrative and filing support" }
    ];

    const handleSelectRole = async (roleId: string) => {
        setLoading(roleId);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // We update the profile with the selected role
                await supabase
                    .from("profiles")
                    .update({ role: roleId })
                    .eq("id", user.id);
            }
            next({ role: roleId });
        } catch (err) {
            console.error("Failed to save role:", err);
            next({ role: roleId }); // Still move forward
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="w-full max-w-2xl bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Your Role</h2>
                <p className="text-gray-500">Choose the account type that best fits your needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((role) => (
                    <button
                        key={role.id}
                        onClick={() => handleSelectRole(role.id)}
                        disabled={loading !== null}
                        className={`flex items-start p-6 border-2 rounded-2xl transition-all duration-300 text-left group ${
                            loading === role.id ? "border-[#089CCE] bg-blue-50" : "border-gray-100 hover:border-[#089CCE] hover:bg-blue-50/50"
                        }`}
                    >
                        <div className="text-3xl mr-4 bg-gray-50 p-3 rounded-xl group-hover:bg-white transition-colors">
                            {loading === role.id ? (
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#089CCE]"></div>
                            ) : role.icon}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#089CCE] transition-colors">{role.title}</h3>
                            <p className="text-sm text-gray-500 mt-1 leading-snug">{role.desc}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
