// server/controllers/notification.controller.ts

import { getPreferences, updatePreferences } from "../services/notificationPreference.service";

export const fetchPreferences = async (req, res) => {
    const { userId } = req.params;

    const data = await getPreferences(userId);

    res.json(data);
};

export const savePreferences = async (req, res) => {
    const { userId, email, sms, in_app } = req.body;

    await updatePreferences(userId, { email, sms, in_app });

    res.json({ success: true });
};