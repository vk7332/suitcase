export interface AffiliateAnalytics {
    totalAffiliates: number;
    totalReferrals: number;
    totalRevenue: number;
    totalCommissions: number;
}

export interface ReferralTrend {
    date: string;
    count: number;
}

export interface TopAffiliate {
    id: string;
    referral_code: string;
    total_referrals: number;
    total_earnings: number;
}


