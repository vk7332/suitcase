import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    profile: any;
    profileCompletion: number;
    onLogout: () => void;
};

export default function UserIdentityCard({
    profile,
    profileCompletion,
    onLogout
}: Props) {
    const navigate = useNavigate();

    const initials = useMemo(() => {
        if (!profile?.full_name) return "U";

        return profile.full_name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    }, [profile]);

    const badgeStyles = {
        free: "bg-gray-100 text-gray-700",
        pro: "bg-blue-100 text-blue-700",
        premium: "bg-yellow-100 text-yellow-700"
    };

    const badgeClass =
        badgeStyles[
            (profile?.subscription_plan || "free").toLowerCase() as keyof typeof badgeStyles
        ] || badgeStyles.free;

    const showUpgrade =
        profile?.profile_completed &&
        profile?.subscription_plan === "free";

    const showCompleteProfile =
        !profile?.profile_completed;

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex flex-col items-center text-center">

                {/* Avatar */}
                {profile?.avatar_url || profile?.logo_url ? (
                    <img
                        src={profile.avatar_url || profile.logo_url}
                        alt="avatar"
                        className="w-24 h-24 rounded-full object-cover border-4 border-[#089CCE]/10 shadow-md"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-[#089CCE] text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                        {initials}
                    </div>
                )}

                {/* Name */}
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                    {profile?.full_name || profile?.email}
                </h2>

                {/* Membership */}
                <div
                    className={`mt-2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${badgeClass}`}
                >
                    {(profile?.subscription_plan || "free").toUpperCase()} MEMBER
                </div>

                {/* Completion */}
                <div className="w-full mt-6">
                    <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
                        <span>Profile Completion</span>
                        <span>{profileCompletion}%</span>
                    </div>

                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#089CCE] rounded-full transition-all"
                            style={{
                                width: `${profileCompletion}%`
                            }}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6 w-full">
                    <button
                        onClick={() => navigate("/settings/profile")}
                        className="flex-1 bg-[#089CCE] text-white py-3 rounded-xl font-semibold hover:bg-[#078bb8] transition"
                    >
                        Profile
                    </button>

                    <button
                        onClick={onLogout}
                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Complete Profile */}
                {showCompleteProfile && (
                    <div className="mt-6 w-full bg-orange-50 border border-orange-100 rounded-2xl p-4 text-left">
                        <h3 className="font-bold text-orange-700">
                            Complete Your Profile
                        </h3>

                        <p className="text-sm text-orange-600 mt-1">
                            Add your chamber details and signature.
                        </p>

                        <button
                            onClick={() => navigate("/settings/profile")}
                            className="mt-4 w-full bg-orange-500 text-white py-2 rounded-xl font-semibold hover:bg-orange-600 transition"
                        >
                            Complete Profile
                        </button>
                    </div>
                )}

                {/* Upgrade */}
                {showUpgrade && (
                    <div className="mt-6 w-full bg-blue-50 border border-blue-100 rounded-2xl p-4 text-left">
                        <h3 className="font-bold text-[#089CCE]">
                            Upgrade Your Plan
                        </h3>

                        <p className="text-sm text-gray-600 mt-1">
                            Unlock premium legal productivity tools.
                        </p>

                        <button
                            onClick={() => navigate("/subscription")}
                            className="mt-4 w-full bg-[#089CCE] text-white py-2 rounded-xl font-semibold hover:bg-[#078bb8] transition"
                        >
                            Upgrade Plan
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}