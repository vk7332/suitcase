import { useState } from "react";
import { inviteJunior } from "../../services/InvitationService";
import { useAuth } from "../../hooks/useAuth";

export default function InviteJunior() {
    const { user } = useAuth();
    const [email, setEmail] = useState("");

    const handleInvite = () => {
        if (!email) return alert("Enter email");
        inviteJunior(email, user.id);
    };

    return (
        <div className="border p-3 mt-4">
            <h3 className="font-bold">Invite Junior Advocate</h3>

            <input
                type="email"
                placeholder="Junior Email"
                className="border p-2 w-full mt-2"
                onChange={(e) => setEmail(e.target.value)}
            />

            <button
                onClick={handleInvite}
                className="bg-blue-600 text-white p-2 mt-2 w-full"
            >
                Send Invite
            </button>
        </div>
    );
}
