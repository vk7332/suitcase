import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req: Request): Promise<Response> => {
    try {
        const payload = await req.text();

        // Log webhook payload
        console.log("Razorpay Webhook Received:", payload);

        // TODO: Verify Razorpay signature for security
        // const signature = req.headers.get("x-razorpay-signature");

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Webhook received successfully",
            }),
            {
                headers: { "Content-Type": "application/json" },
                status: 200,
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                status: "error",
                message: (error as Error).message,
            }),
            {
                headers: { "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
});