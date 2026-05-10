import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { UserRole } from "@/types/roles";

interface RoleContextType {
    role: UserRole | null;
    loading: boolean;
    refreshRole: () => Promise<void>;
}

export const RoleContext = createContext<RoleContextType | null>(null);

export const useRoleContext = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error("useRoleContext must be used within a RoleProvider");
    }
    return context;
};

export const RoleProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState<UserRole | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshRole = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();
            if (data) setRole(data.role);
        }
        setLoading(false);
    };

    useEffect(() => {
        refreshRole();
    }, []);

    return (
        <RoleContext.Provider value={{ role, loading, refreshRole }}>
            {children}
        </RoleContext.Provider>
    );
};
