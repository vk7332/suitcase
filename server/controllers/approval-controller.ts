import { supabase } from "../config/supabase.js";
import { Request, Response } from 'express';
import { sendNotification } from "../services/notification-service.js";

// 📋 get pending approvals
export const getPendingApprovals = async (req: Request, res: Response) => {
    const { data } = await supabase
        .from("audit_logs")
        .select("*")
        .eq("chamber_id", req.user.chamber_id)
        .eq("status", "pending")
        .order("created_at", { ascending: false });

    res.json(data);
};

// ✅ approve
export const approveAction = async (req: Request, res: Response) => {
    const { id, comment } = req.body;
    const admin = req.user;

    const { data } = await supabase
        .from("audit_logs")
        .select("*")
        .eq("id", id)
        .single();

    if (!data) return res.status(404).json({ error: "not found" });

    // 🔁 update based on action
    if (data.action === "cancel_request") {
        await supabase
            .from("invoices")
            .update({ status: "cancelled" })
            .eq("id", data.entity_id);
    }

    if (data.action === "credit_note_requested") {
        await supabase
            .from("credit_notes")
            .update({ approval_status: "approved" })
            .eq("id", data.entity_id);
    }

    // 📜 update audit
    await supabase
        .from("audit_logs")
        .update({
            status: "approved",
            reviewer_id: admin.id,
            review_comment: comment,
            reviewed_at: new Date(),
        })
        .eq("id", id);

    await sendNotification({
        user_id: data.user_id,
        email: data.meta?.email || null,
        phone: data.meta?.phone || null,
        message: "Your request has been approved",
    });

    res.json({ success: true });
};

// ❌ reject
export const rejectAction = async (req: Request, res: Response) => {
    const { id, comment } = req.body;
    const admin = req.user;

    const { data } = await supabase
        .from("audit_logs")
        .select("*")
        .eq("id", id)
        .single();

    await supabase
        .from("audit_logs")
        .update({
            status: "rejected",
            reviewer_id: admin.id,
            review_comment: comment,
            reviewed_at: new Date(),
        })
        .eq("id", id);

    await sendNotification({
        user_id: data?.user_id,
        email: data?.meta?.email || null,
        phone: data?.meta?.phone || null,
        message: "Your request has been rejected",
    });

    res.json({ success: true });
};