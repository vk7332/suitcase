import { supabase } from "../config/supabase";
import { Request, Response } from 'express';
import { logAudit } from "../services/audit.service";

// 🧾 CREATE CREDIT NOTE
export const createCreditNote = async (req: Request, res: Response) => {
    const { invoiceId, amount, reason } = req.body;
    const user = req.user;

    const status = user.role === "admin" ? "approved" : "pending";

    const { data } = await supabase
        .from("credit_notes")
        .insert([
            {
                invoice_id: invoiceId,
                chamber_id: user.chamber_id,
                amount,
                reason,
                approval_status: status,
            },
        ])
        .select()
        .single();

    await supabase.from("audit_logs").insert([
        {
            user_id: user.id,
            chamber_id: user.chamber_id,
            action: "cancel_request",
            entity: "invoice",
            entity_id: invoiceId,
            meta: {
                reason,
                email: user.email,
                phone: user.phone,
            },
        },
    ]);

    res.json(data);
};

// 📜 GET AUDIT LOGS
export const getAuditLogs = async (req: Request, res: Response) => {
    const { data } = await supabase
        .from("audit_logs")
        .select("*")
        .eq("chamber_id", req.user.chamber_id)
        .order("created_at", { ascending: false });

    res.json(data);
};

export const cancelInvoice = async (req: Request, res: Response) => {
    const { invoiceId, reason } = req.body;
    const user = req.user;

    if (user.role !== "admin") {
        // 🔐 request instead of direct cancel
        await supabase.from("audit_logs").insert([
            {
                user_id: user.id,
                chamber_id: user.chamber_id,
                action: "cancel_request",
                entity: "invoice",
                entity_id: invoiceId,
                meta: { reason },
            },
        ]);

        return res.json({ message: "request sent for approval" });
    }

    // ✅ admin direct cancel
    await supabase
        .from("invoices")
        .update({ status: "cancelled" })
        .eq("id", invoiceId);

    res.json({ success: true });
};