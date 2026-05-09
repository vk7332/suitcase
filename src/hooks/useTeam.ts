import { useEffect, useState } from "react";

export const useTeam = () => {
    const [members, setMembers] = useState([]);

    const fetchMembers = async () => {
        const res = await fetch("/api/chamber/members", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await res.json();
        setMembers(data);
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    return { members, refresh: fetchMembers };
};