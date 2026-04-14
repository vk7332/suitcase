import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const {
            payout_id,
            amount,
            method,
            name,
            email,
            contact,
            account_number,
            ifsc,
            upi_id,
        } = await req.json();

        const supabase = createClient(
            Deno.env.get("SUPABASE_URL")!,
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        );

        const keyId = Deno.env.get("RAZORPAY_KEY_ID")!;
        const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET")!;
        const accountNumber = Deno.env.get("RAZORPAYX_ACCOUNT_NUMBER")!;

        const authHeader =
            "Basic " + btoa(`${keyId}:${keySecret}`);

        // Step 1: Create Contact
        const contactRes = await fetch(
            "https://api.razorpay.com/v1/contacts",
            {
                method: "POST",
                headers: {
                    Authorization: authHeader,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    contact,
                    type: "vendor",
                }),
            }
        );

        const contactData = await contactRes.json();

        // Step 2: Create Fund Account
        const fundAccountPayload: any = {
            contact_id: contactData.id,
            account_type:
                method === "UPI" ? "vpa" : "bank_account",
        };

        if (method === "UPI") {
            fundAccountPayload.vpa = {
                address: upi_id,
            };
        } else {
            fundAccountPayload.bank_account = {
                name,
                ifsc,
                account_number,
            };
        }

        const fundRes = await fetch(
            "https://api.razorpay.com/v1/fund_accounts",
            {
                method: "POST",
                headers: {
                    Authorization: authHeader,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fundAccountPayload),
            }
        );

        const fundData = await fundRes.json();

        // Step 3: Initiate Payout
        const payoutRes = await fetch(
            "https://api.razorpay.com/v1/payouts",
            {
                method: "POST",
                headers: {
                    Authorization: authHeader,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    account_number: accountNumber,
                    fund_account_id: fundData.id,
                    amount: Math.round(amount * 100),
                    currency: "INR",
                    mode: method === "UPI" ? "UPI" : "IMPS",
                    purpose: "payout",
                    queue_if_low_balance: true,
                    narration: "SUITCASE Affiliate Commission",
                    reference_id: payout_id,
                }),
            }
        );

        const payoutData = await payoutRes.json();

        // Step 4: Update Database
        await supabase
            .from("payout_requests")
            .update({
                status: "processed",
                razorpay_payout_id: payoutData.id,
                processed_at: new Date().toISOString(),
            })
            .eq("id", payout_id);

        return new Response(
            JSON.stringify({
                success: true,
                payout: payoutData,
            }),
            {
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                success: false,
                error: error.message,
            }),
            {
                status: 500,
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
            }
        );
    }
});