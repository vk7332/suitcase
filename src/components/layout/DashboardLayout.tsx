import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/utils/supabase/supabase-client";
import UserIdentityCard from "@/components/dashboard/UserIdentityCard";
import { calculateProfileCompletion } from "@/utils/profile-completion";

type Props = {
children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
const navigate = useNavigate();

const [user, setUser] = useState<any>(null);
const [profile, setProfile] = useState<any>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const loadUser = async () => {
        try {
            const {
                data: { user }
            } = await supabase.auth.getUser();

            setUser(user);

            if (user) {
                const { data: profileData, error } = await supabase
                    .from("profiles")
                    .select(`
                        id,
                        email,
                        full_name,
                        avatar_url,
                        logo_url,
                        signature_url,
                        subscription_plan,
                        profile_completed,
                        role,
                        chamber_name,
                        phone,
                        bio,
                        address,
                        practice_areas,
                        bar_council
                    `)
                    .eq("id", user.id)
                    .maybeSingle();

                if (error) {
                    console.error("Profile load failed:", error);
                }

                setProfile(profileData ?? null);
            } else {
                setProfile(null);
            }
        } catch (err) {
            console.error(err);
            setProfile(null);
        } finally {
            setLoading(false);
        }
    };

    void loadUser();
}, []);

const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
};

if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-gray-500 font-medium">
                Loading dashboard...
            </div>
        </div>
    );
}

return (
    <div className="min-h-screen bg-gray-50 flex">

        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col p-5">

            {/* Logo */}
            <div className="mb-8">
                <h1 className="text-2xl font-black text-[#089CCE]">
                    SUITCASE
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2">

                <button
                    onClick={() => navigate("/advocate/cases")}
                    className="text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition font-medium"
                >
                    My Cases
                </button>

                <button
                    onClick={() => navigate("/clients")}
                    className="text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition font-medium"
                >
                    Client List
                </button>

                <button
                    onClick={() => navigate("/ai-draft")}
                    className="text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition font-medium"
                >
                    AI Drafts
                </button>

                <button
                    onClick={() => navigate("/cause-list")}
                    className="text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition font-medium"
                >
                    Cause List
                </button>

                <button
                    onClick={() => navigate("/calendar")}
                    className="text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition font-medium"
                >
                    Calendar
                </button>

                <button
                    onClick={() => navigate("/invoices")}
                    className="text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition font-medium"
                >
                    Invoices
                </button>
            </nav>

            {/* Bottom User Identity */}
            <div className="mt-auto pt-6">
                <UserIdentityCard
                    profile={profile}
                    profileCompletion={calculateProfileCompletion(profile)}
                    onLogout={handleLogout}
                />
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
            {children}
        </main>
    </div>
);
}