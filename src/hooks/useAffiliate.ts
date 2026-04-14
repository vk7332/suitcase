import { useEffect, useState } from "react";
import {
    getAffiliate,
    getReferrals,
    getCommissions,
} from "../services/AffiliateService";
import { useAuth } from "./useAuth";

export const useAffiliate = () => {
    const { user } = useAuth();
    const [affiliate, setAffiliate] = useState<any>(null);
    const [referrals, setReferrals] = useState<any[]>([]);
    const [commissions, setCommissions] = useState<any[]>([]);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            setAffiliate(await getAffiliate(user.id));
            setReferrals(await getReferrals(user.id));
            setCommissions(await getCommissions(user.id));
        };

        fetchData();
    }, [user]);

    return { affiliate, referrals, commissions };
};
