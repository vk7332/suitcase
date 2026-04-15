export const generateReferralCode = (email: string): string => {
  const prefix = email.split("@")[0].substring(0, 4).toUpperCase();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `SC-${prefix}-${random}`;
};

export const generateReferralLink = (referralCode: string): string => {
  return `${window.location.origin}/register?ref=${referralCode}`;
};
