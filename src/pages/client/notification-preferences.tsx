import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useClientAuth } from "@/hooks/useClientAuth";

export default function NotificationPreferences() {
    const { user } = useClientAuth();

    const [prefs, setPrefs] = useState({
        notify_email: true,
        notify_sms: false,
        notify_app: true,
    });

    useEffect(() => {
        const fetchPrefs = async () => {
            const { data } = await supabase
                .from("profiles")
                .select("notify_email, notify_sms, notify_app")
                .eq("id", user.id)
                .single();

            if (data) setPrefs(data);
        };

        if (user) fetchPrefs();
    }, [user]);

    const updatePref = async (key: string, value: boolean) => {
        const updated = { ...prefs, [key]: value };
        setPrefs(updated);

        await supabase
            .from("profiles")
            .update(updated)
            .eq("id", user.id);
    };

    return (
        <div className="p-6 max-w-md">
            <h1 className="text-xl font-bold mb-4">
                Notification Preferences
            </h1>

            {["notify_app", "notify_email", "notify_sms"].map((key) => (
                <div key={key} className="flex justify-between mb-3">
                    <span>{key.replace("notify_", "").toUpperCase()}</span>

                    <input
                        type="checkbox"
                        checked={(prefs as any)[key]}
                        onChange={(e) => updatePref(key, e.target.checked)}
                    />
                </div>
            ))}
        </div>
    );
}
