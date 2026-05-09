import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseclient";
import { useClientAuth } from "@/hooks/useClientAuth";
import { useRoleGuard } from "@/hooks/useRoleGuard";
import { getTeamMembers } from "@/engines/team/team.engine";
import { useTeam } from "@/hooks/useTeam";
import InviteForm from "@/components/team/invite-form";
import MemberList from "@/components/team/member-list";

interface Member {
    id: string;
    name: string;
    email: string;
    role: string;
}

export default function TeamPage() {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        const fetchTeam = async () => {
            const { data } = await supabase
                .from("profiles")
                .select("id, name, email, role");

            if (data) setMembers(data);
        };

        fetchTeam();
    }, []);

    useEffect(() => {
        if (!user) return;

        const fetch = async () => {
            const data = await getTeamMembers(user.organization_id);
            setMembers(data);
        };

        fetch();
    }, [user]);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">
                Team Members
            </h1>

            <div className="space-y-3">
                {members.map((m) => (
                    <div
                        key={m.id}
                        className="border p-3 rounded flex justify-between"
                    >
                        <div>
                            <p className="font-semibold">{m.name}</p>
                            <p className="text-sm text-gray-500">{m.email}</p>
                        </div>

                        <span className="text-sm capitalize">
                            {m.role}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}