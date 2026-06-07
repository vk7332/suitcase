import { supabase } from "@/utils/supabase/supabase-client";

type Props = {
    userId: string;
    signatureUrl?: string;
    onUpload: (url: string) => void;
};

export default function SignatureUpload({
    userId,
    signatureUrl,
    onUpload,
}: Props) {
    const uploadSignature = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        try {
            const file = e.target.files?.[0];

            if (!file) return;

            const fileExt = file.name.split(".").pop();

            const filePath = `${userId}/signature.${fileExt}`;

            const { error } = await supabase.storage
                .from("signatures")
                .upload(filePath, file, {
                    upsert: true,
                });

            if (error) throw error;

            const { data } = supabase.storage
                .from("signatures")
                .getPublicUrl(filePath);

            onUpload(data.publicUrl);
        } catch (err) {
            console.error(err);
            alert("Signature upload failed");
        }
    };

    return (
        <div>
            <div className="w-full h-32 border rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center mb-4">
                {signatureUrl ? (
                    <img
                        src={signatureUrl}
                        alt="Signature"
                        className="max-h-full"
                    />
                ) : (
                    <div className="text-gray-400">
                        No signature uploaded
                    </div>
                )}
            </div>

            <label className="bg-[#089CCE] text-white px-5 py-3 rounded-xl cursor-pointer">
                Upload Signature

                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={uploadSignature}
                />
            </label>
        </div>
    );
}