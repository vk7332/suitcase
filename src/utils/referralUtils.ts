export const generateReferralCode = (prefix: string = "SC") => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${random}`;
};

export const getReferralLink = (code: string) => {
    return `${window.location.origin}/register?ref=${code}`;
};
