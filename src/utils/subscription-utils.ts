export const isTrialActive = (trialEndDate: string | null): boolean => {
  if (!trialEndDate) return false;
  return new Date(trialEndDate) > new Date();
};

export const hasPremiumAccess = (
  plan: string | null,
  trialEndDate: string | null
): boolean => {
  if (plan === "pro" || plan === "premium") return true;
  return isTrialActive(trialEndDate);
};


