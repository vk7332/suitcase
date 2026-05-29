import { useEffect } from "react";
import { supabase } from "@/utils/supabase/supabase-client";

export const useRealtimeCases = (clientId: string, onUpdate: any) => {
    useEffect(() => {
        const channel = supabase
            .channel("cases-realtime")
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "cases",
                    filter: `client_id=eq.${clientId}`,
                },
                (payload) => {
                    onUpdate(payload.new);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [clientId, onUpdate]);
};
