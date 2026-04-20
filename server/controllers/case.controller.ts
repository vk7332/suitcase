// server/controllers/case.controller.ts

import { sendEmail } from "../services/email.service";
import { sendSMS } from "../services/sms.service";
import { getPreferences } from "../services/notificationPreference.service";
import { logAction } from "../services/audit.service";

const prefs = await getPreferences(clientId);


export const getCases = async (req, res) => {
    const { data } = await supabase
        .from("cases")
        .select("*");
    res.json({ cases: data });
};

export const updateCaseStatus = async (req, res) => {
    await logAction({
        userId,
        caseId,
        action: "CASE_STATUS_UPDATED",
        metadata: { status },
    });

    try {
        const { caseId, status } = req.body;

        const { data: updatedCase } = await supabase
            .from("cases")
            .update({ status })
            .eq("id", caseId)
            .select("*, client:client_id(email, phone)")
            .single();

        const client = updatedCase.client;

        // 🔔 IN-APP
        if (prefs?.in_app) {
            await supabase.from("notifications").insert([
                {
                    user_id: clientId,
                    message: `Case updated to ${status}`,
                },
            ]);
        }

        // 📧 EMAIL
        if (prefs?.email && client?.email) {
            await sendEmail(...);
        }

        // 📱 SMS
        if (prefs?.sms && client?.phone) {
            await sendSMS(...);
        }

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "failed" });
    }
};

export const createCase = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.user.id;

        const { data } = await supabase
            .from("cases")
            .insert([{ title, advocate_id: userId }])
            .select()
            .single();

        // ✅ AUDIT LOG HERE
        await logAction({
            userId,
            caseId: data.id,
            action: "CASE_CREATED",
            metadata: { title },
        });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "failed" });
    }
};