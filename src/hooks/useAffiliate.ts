import { useEffect } from "react";
import { supabase } from "@/utils/supabase/supabaseclient";
import { getReferralFromURL } from "@/utils/referralUtils";

export const useAffiliate = () => {
    useEffect(() => {
        const saveReferral = async () => {
            const ref = getReferralFromURL();
            if (!ref) return;

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            await supabase.from("referrals").insert({
                referrer_id: ref,
                user_id: user.id,
            });
        };

        saveReferral();
    }, []);
};