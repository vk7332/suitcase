import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabase-client";
import AvatarUpload from "@/components/profile/AvatarUpload";
import SignatureUpload from "@/components/profile/SignatureUpload";
import {
    calculateProfileCompletion,
} from "@/utils/profile-completion";
import LogoUpload from "@/components/profile/LogoUpload";

type Profile = {
    full_name?: string;
    phone?: string;
    chamber_name?: string;
    website?: string;
    professional_title?: string;
    avatar_url?: string;
    logo_url?: string;
    signature_url?: string;
    bio?: string;
    address?: string;
    practice_areas?: string;
    bar_council?: string;
};

export default function ProfileSettingsPage() {
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    const [profile, setProfile] = useState<Profile>({
        full_name: "",
        phone: "",
        chamber_name: "",
        website: "",
        professional_title: "",
        avatar_url: "",
        logo_url: "",
        signature_url: "",
        bio: "",
        address: "",
        practice_areas: "",
        bar_council: "",
    });

    const completion = calculateProfileCompletion(profile);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) return;

            setUserId(user.id);

            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            if (error) throw error;

            if (data) {
                setProfile(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

const saveProfile = async () => {
    try {
        setSaving(true);

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            alert("User not found");
            return;
        }

        const updateData = {
            full_name: profile.full_name || "",
            professional_title: profile.professional_title || "",
            phone: profile.phone || "",
            chamber_name: profile.chamber_name || "",
            website: profile.website || "",
            bio: profile.bio || "",
            address: profile.address || "",
            practice_areas: profile.practice_areas
    ? profile.practice_areas
          .split(",")
          .map((item: string) => item.trim())
    : [],
            bar_council: profile.bar_council || "",
            avatar_url: profile.avatar_url || "",
            signature_url: profile.signature_url || "",
            logo_url: profile.logo_url || "",
            profile_completed: true,
            updated_at: new Date().toISOString(),
        };

        console.log("UPDATING PROFILE:", updateData);

        const { error } = await supabase
            .from("profiles")
            .update(updateData)
            .eq("id", user.id);

        if (error) {
            console.error(error);
            alert(error.message);
            return;
        }

        alert("Profile updated successfully");
    } catch (error) {
        console.error(error);
        alert("Failed to update profile");
    } finally {
        setSaving(false);
    }
};

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Profile Settings
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage your professional identity.
                        </p>
                    </div>

                    <div className="text-right">
                        <div className="text-sm text-gray-500 mb-2">
                            Profile Completion
                        </div>

                        <div className="text-3xl font-bold text-[#089CCE]">
                            {completion}%
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <AvatarUpload
                            userId={userId}
                            avatarUrl={profile.avatar_url}
                            onUpload={(url) =>
                                setProfile({
                                    ...profile,
                                    avatar_url: url,
                                })
                            }
                        />
                        <LogoUpload
    logoUrl={profile.logo_url}
    onUpload={(url) =>
        setProfile((prev: any) => ({
            ...prev,
            logo_url: url,
        }))
    }
/>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Full Name
                            </label>

                            <input
                                value={profile.full_name || ""}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        full_name: e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl p-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Professional Title
                            </label>

                            <input
                                value={profile.professional_title || ""}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        professional_title:
                                            e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl p-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Mobile Number
                            </label>

                            <input
                                value={profile.phone || ""}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        phone: e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl p-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Chamber Name
                            </label>

                            <input
                                value={profile.chamber_name || ""}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        chamber_name: e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl p-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Website
                            </label>

                            <input
                                value={profile.website || ""}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        website: e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl p-3"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <SignatureUpload
                            userId={userId}
                            signatureUrl={profile.signature_url}
                            onUpload={(url) =>
                                setProfile({
                                    ...profile,
                                    signature_url: url,
                                })
                            }
                        />

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Bio
                            </label>

                            <textarea
                                rows={4}
                                value={profile.bio || ""}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        bio: e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl p-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Address
                            </label>

                            <textarea
                                rows={3}
                                value={profile.address || ""}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        address: e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl p-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Practice Areas
                            </label>

                            <input
                                value={profile.practice_areas || ""}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        practice_areas:
                                            e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl p-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Bar Council
                            </label>

                            <input
                                value={profile.bar_council || ""}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        bar_council:
                                            e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl p-3"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <button
                        onClick={saveProfile}
                        className="bg-[#089CCE] text-white px-8 py-4 rounded-2xl font-bold shadow-lg"
                    >
                        Save Profile
                    </button>
                </div>
            </div>
        </div>
    );
}