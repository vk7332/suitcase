import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import type { UserRole } from "@/types/roles";

interface RoleContextType {
    role: UserRole | null;
    loading: boolean;
    refreshRole: () => Promise<void>;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

interface RoleProviderProps {
    children: ReactNode;
}

export const RoleProvider = ({ children }: RoleProviderProps) => {
    const [role, setRole] = useState<UserRole | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUserRole = async () => {
        try {
            setLoading(true);

            // Get authenticated user
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                setRole("public");
                setLoading(false);
                return;
            }

            // Fetch role from profiles table
            const { data, error } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

            if (error || !data?.role) {
                console.warn("Role not found. Defaulting to 'public'.");
                setRole("public");
            } else {
                setRole(data.role as UserRole);
            }
        } catch (err) {
            console.error("Error fetching user role:", err);
            setRole("public");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserRole();

        // Listen for authentication changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(() => {
            fetchUserRole();
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <RoleContext.Provider
            value={{
                role,
                loading,
                refreshRole: fetchUserRole,
            }}
        >
            {children}
        </RoleContext.Provider>
    );
};

/**
 * Hook to access Role Context
 */
export const useRoleContext = (): RoleContextType => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error(
            "useRoleContext must be used within a RoleProvider"
        );
    }
    return context;
};

export default RoleContext;