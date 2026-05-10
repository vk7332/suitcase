import { supabase } from "./supabase/supabaseClient";

export const generateReferralCode = (email: string): string => {
  const prefix = email.split("@")[0].substring(0, 4).toUpperCase();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `SC-${prefix}-${random}`;
};

export const generateReferralLink = (referralCode: string): string => {
  return `${window.location.origin}/register?ref=${referralCode}`;
};

export const parseReferralCodeFromURL = (): string | null => {
  const params = new URLSearchParams(window.location.search);
  return params.get("ref");
}

export const getReferralFromURL = () => {
  return new URLSearchParams(window.location.search).get("ref");
};

export const recordReferral = async (referrerId: string) => {

  await supabase.from("affiliate_earnings").insert([
    {
      referrer_id: referrerId,
      amount: 100, // ₹100 commission
    },
  ]);
};

