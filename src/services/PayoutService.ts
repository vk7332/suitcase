import { supabase } from "@/utils/supabase/supabaseClient";

export const processPayout = async (payoutData: any) => {
    const { data, error } = await supabase.functions.invoke(
        "process-payout",
        {
            body: payoutData,
        }
    );

    if (error) throw error;
    return data;
};



