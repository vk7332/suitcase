import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function JoinChamber() {
    const { token } = useParams();

    useEffect(() => {
        const join = async () => {
            await fetch("/api/chamber/accept", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ token }),
            });
        };

        if (token) join();
    }, [token]);

    return <p>Joining chamber...</p>;
}
