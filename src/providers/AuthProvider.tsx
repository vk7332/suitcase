import { useEffect } from "react";
import { useAuth } from "../hooks/use-auth";
import { attachToken } from "../lib/api";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { accessToken } = useAuth();

    useEffect(() => {
        attachToken(accessToken);
    }, [accessToken]);

    return children;
};
