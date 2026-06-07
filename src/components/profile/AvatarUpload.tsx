import { supabase } from "@/utils/supabase/supabase-client";

type Props = {
    userId: string;
    avatarUrl?: string;
    onUpload: (url: string) => void;
};

export default function AvatarUpload({
    userId,
    avatarUrl,
    onUpload,
}: Props) {
    const uploadAvatar = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        try {
            const file = e.target.files?.[0];

            if (!file) return;

            const fileExt = file.name.split(".").pop();

            const filePath = `${userId}/avatar.${fileExt}`;

            const { error } = await supabase.storage
                .from("avatars")
                .upload(filePath, file, {
                    upsert: true,
                });

            if (error) throw error;

            const { data } = supabase.storage
                .from("avatars")
                .getPublicUrl(filePath);
console.log("Uploading file...");
console.log(filePath);
            onUpload(data.publicUrl);
            console.log(error);
        } catch (err) {
            console.error(err);
            alert("Avatar upload failed");
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200 mb-3">
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                        Avatar
                    </div>
                )}
            </div>

            <label className="bg-[#089CCE] text-white px-4 py-2 rounded-xl cursor-pointer text-sm">
                Upload Avatar

                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={uploadAvatar}
                />
            </label>
        </div>
    );
}