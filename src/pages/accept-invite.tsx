import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase/supabaseclient";

export default function AcceptInvite() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const token = params.get("token");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const accept = async () => {
            const { data: invite } = await supabase
                .from("invites")
                .select("*")
                .eq("token", token)
                .single();

            if (!invite) {
                alert("Invalid invite");
                return;
            }

            const { data: userData } = await supabase.auth.getUser();

            if (!userData.user) {
                navigate("/login");
                return;
            }

            // ✅ update user org + role
            await supabase
                .from("users")
                .update({
                    organization_id: invite.organization_id,
                    role: invite.role,
                })
                .eq("id", userData.user.id);

            // ✅ mark invite accepted
            await supabase
                .from("invites")
                .update({ status: "accepted" })
                .eq("id", invite.id);

            navigate("/dashboard");
        };

        accept();
    }, [token, navigate]);

    return <p>{loading ? "Joining organization..." : "Done"}</p>;
}