import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { getReferralFromURL } from "@/utils/referralUtils";
import { Affiliate, Referral } from "@/types/affiliate";

export const useAffiliate = () => {
    const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    setLoading(false);
                    return;
                }

                // 1. Get Affiliate Profile
                const { data: affData } = await supabase
                    .from("affiliates")
                    .select("*")
                    .eq("user_id", user.id)
                    .single();

                if (affData) {
                    setAffiliate(affData);

                    // 2. Get Referrals
                    const { data: refData } = await supabase
                        .from("referrals")
                        .select("*")
                        .eq("referrer_id", affData.id);
                    
                    if (refData) setReferrals(refData);
                }

                // 3. Save pending referral if exists
                const ref = getReferralFromURL();
                if (ref) {
                    await supabase.from("referrals").insert({
                        referrer_id: ref,
                        user_id: user.id,
                    });
                }
            } catch (e) {
                console.error("Failed to load affiliate data", e);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return { affiliate, referrals, loading };
};
