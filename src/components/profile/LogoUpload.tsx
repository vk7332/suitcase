import { useState } from "react";
import { supabase } from "@/utils/supabase/supabase-client";

type Props = {
    logoUrl?: string;
    onUpload: (url: string) => void;
};

export default function LogoUpload({
    logoUrl,
    onUpload,
}: Props) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        try {
            const file = event.target.files?.[0];

            if (!file) return;

            setUploading(true);

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                alert("User not found");
                return;
            }

            const fileExt = file.name.split(".").pop();
            const filePath = `${user.id}/logo.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from("logos")
                .upload(filePath, file, {
                    upsert: true,
                });

            if (uploadError) {
                console.error(uploadError);
                alert("Logo upload failed");
                return;
            }

            const { data } = supabase.storage
                .from("logos")
                .getPublicUrl(filePath);

            onUpload(data.publicUrl);
        } catch (error) {
            console.error(error);
            alert("Logo upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-3xl overflow-hidden border border-gray-200 bg-white shadow">
                {logoUrl ? (
                    <img
                        src={logoUrl}
                        alt="Chamber Logo"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-gray-400 text-center px-2">
                        Chamber Logo
                    </div>
                )}
            </div>

            <label className="mt-3 cursor-pointer bg-[#089CCE] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#078bb8] transition">
                {uploading ? "Uploading..." : "Upload Logo"}

                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleUpload}
                />
            </label>
        </div>
    );
}