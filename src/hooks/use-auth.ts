import { useAuth as useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
    const { user, session, loading } = useAuthContext();

    return {
        session,
        user,
        accessToken: session?.access_token,
        loading,
    };
};
