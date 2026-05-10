import { supabase } from "@/utils/supabase/supabaseClient";

export const activateTrial = async (
    userId: string,
    enrollmentNumber: string,
    plan: "pro" | "premium"
) => {
    // Check if enrollment number has already been used by ANY user
    const { data: existing, error: fetchError } = await supabase
        .from("profiles")
        .select("id, trial_used")
        .eq("advocate_enrollment_number", enrollmentNumber)
        .maybeSingle();

    if (fetchError) throw fetchError;

    // If enrollment number exists and belongs to another user
    if (existing && existing.id !== userId) {
        const error = new Error("You already have an account");
        (error as any).redirect = true; // Flag for UI to handle redirect
        throw error;
    }

    if (existing?.trial_used && existing.id === userId) {
        throw new Error(
            "A free trial has already been used with this Advocate Enrollment Number."
        );
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);

    const { error } = await supabase
        .from("profiles")
        .update({
            advocate_enrollment_number: enrollmentNumber,
            subscription_plan: plan,
            trial_start_date: startDate.toISOString(),
            trial_end_date: endDate.toISOString(),
            trial_used: true,
        })
        .eq("id", userId);

    if (error) throw error;

    return { success: true };
};


