import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";

export const useNotifications = (userId: string) => {
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        // initial fetch
        supabase
            .from("notifications")
            .select("*")
            .eq("user_id", userId)
            .then(({ data }) => setNotifications(data || []));

        // realtime
        const channel = supabase
            .channel("notifications")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "notifications",
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => {
                    setNotifications((prev) => [
                        payload.new,
                        ...prev,
                    ]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId]);

    return notifications;
};
