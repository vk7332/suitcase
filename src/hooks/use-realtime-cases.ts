import { useEffect } from "react";
import { supabase } from "@/utils/supabase/supabase-client";

export const useRealtimeCases = (
    onUpdate: () => void
) => {
    useEffect(() => {
        const channel = supabase
            .channel("cases-realtime")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "cases",
                },
                () => {
                    onUpdate();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [onUpdate]);
};