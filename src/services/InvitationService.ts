import { supabase } from "../lib/supabaseClient";

export async function inviteJunior(email: string, userId: string) {
    const { error } = await supabase
        .from("invitations")
        .insert([
            {
                email,
                role: "JUNIOR",
                invited_by: userId,
            },
        ]);

    if (error) {
        alert("Error sending invite");
    } else {
        alert("Invitation sent");
    }
}
