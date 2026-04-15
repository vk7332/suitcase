import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useProfile } from "../../hooks/useProfile";

const ProfileSettingsPage: React.FC = () => {
    const { profile, refetch } = useProfile();

    const [formData, setFormData] = useState<any>({
        full_name: "",
        enrollment_number: "",
        chamber_name: "",
        phone: "",
        email: "",
        website: "",
        address: "",
        logo_url: "",
        signature_url: "",
    });

    useEffect(() => {
        if (profile) {
            setFormData(profile);
        }
    }, [profile]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const uploadFile = async (
        e: React.ChangeEvent<HTMLInputElement>,
        bucket: string
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;

        if (!user) return;

        const filePath = `${user.id}-${Date.now()}`;

        const { error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, { upsert: true });

        if (error) {
            alert("Upload failed");
            return;
        }

        const { data } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);

        setFormData((prev: any) => ({
            ...prev,
            [`${bucket.slice(0, -1)}_url`]: data.publicUrl,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;

        if (!user) return;

        await supabase.from("profiles").upsert({
            id: user.id,
            ...formData,
        });

        alert("Profile updated successfully!");
        refetch();
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded">
            <h2 className="text-2xl font-bold mb-6">
                Advocate Branding Profile
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <input name="full_name" placeholder="Full Name"
                    value={formData.full_name || ""} onChange={handleChange} className="border p-2" />

                <input name="enrollment_number" placeholder="Enrollment Number"
                    value={formData.enrollment_number || ""} onChange={handleChange} className="border p-2" />

                <input name="chamber_name" placeholder="Chamber Name"
                    value={formData.chamber_name || ""} onChange={handleChange} className="border p-2" />

                <input name="phone" placeholder="Phone"
                    value={formData.phone || ""} onChange={handleChange} className="border p-2" />

                <input name="email" placeholder="Email"
                    value={formData.email || ""} onChange={handleChange} className="border p-2" />

                <input name="website" placeholder="Website"
                    value={formData.website || ""} onChange={handleChange} className="border p-2" />

                <input name="address" placeholder="Address"
                    value={formData.address || ""} onChange={handleChange} className="border p-2 col-span-2" />

                <div>
                    <label className="block mb-1">Upload Logo</label>
                    <input type="file" onChange={(e) => uploadFile(e, "logos")} />
                </div>

                <div>
                    <label className="block mb-1">Upload Signature</label>
                    <input type="file" onChange={(e) => uploadFile(e, "signatures")} />
                </div>

                <button
                    type="submit"
                    className="col-span-2 bg-blue-600 text-white py-2 rounded"
                >
                    Save Profile
                </button>
            </form>
        </div>
    );
};

export default ProfileSettingsPage;
