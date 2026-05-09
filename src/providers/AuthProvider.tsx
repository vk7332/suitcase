import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { attachToken } from "../lib/api";

export const AuthProvider = ({ children }) => {
    const { accessToken } = useAuth();

    useEffect(() => {
        attachToken(accessToken);
    }, [accessToken]);

    return children;
};