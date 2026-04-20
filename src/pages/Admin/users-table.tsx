import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseclient";

export default function UsersTable() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const load = async () => {
            const { data } = await supabase
                .from("profiles")
                .select("*");

            setUsers(data || []);
        };

        load();
    }, []);

    return (
        <div>
            <h2>Users</h2>

            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>{u.subscription_status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}