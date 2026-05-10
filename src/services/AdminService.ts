import { supabase } from "@/utils/supabase/supabaseClient";

export const getAdminDashboardData = async () => {
    // Fetch all subscriptions
    const { data: subscriptions, error: subError } = await supabase
        .from("subscriptions")
        .select("*");

    if (subError) throw subError;

    // Fetch payments
    const { data: payments, error: payError } = await supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

    if (payError) throw payError;

    // Total Revenue
    const totalRevenue =
        subscriptions?.reduce(
            (sum, sub) => sum + (Number(sub.amount) || 0),
            0
        ) || 0;

    // Active Subscriptions
    const activeSubscriptions =
        subscriptions?.filter((s) => s.status === "active").length || 0;

    // Plan Distribution
    const planDistribution = [
        {
            name: "FREE",
            value: subscriptions?.filter((s) => s.plan === "FREE").length || 0,
        },
        {
            name: "PRO",
            value: subscriptions?.filter((s) => s.plan === "PRO").length || 0,
        },
        {
            name: "PREMIUM",
            value:
                subscriptions?.filter((s) => s.plan === "PREMIUM").length || 0,
        },
    ];

    // Monthly Revenue
    const monthlyRevenueMap: Record<string, number> = {};

    subscriptions?.forEach((sub) => {
        if (!sub.created_at) return;
        const month = new Date(sub.created_at).toLocaleString("default", {
            month: "short",
            year: "numeric",
        });
        monthlyRevenueMap[month] =
            (monthlyRevenueMap[month] || 0) + Number(sub.amount || 0);
    });

    const monthlyRevenue = Object.entries(monthlyRevenueMap).map(
        ([month, revenue]) => ({
            month,
            revenue,
        })
    );

    return {
        totalRevenue,
        activeSubscriptions,
        planDistribution,
        monthlyRevenue,
        recentPayments: payments || [],
    };
};



