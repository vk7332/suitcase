import { Request, Response } from 'express';
// server/controllers/notification.controller.ts

import { getPreferences, updatePreferences } from "../services/notification-preference-service.ts";

export const fetchPreferences = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const data = await getPreferences(String(userId));

    res.json(data);
};

export const savePreferences = async (req: Request, res: Response) => {
    const { userId, email, sms, in_app } = req.body;

    await updatePreferences(userId, { email, sms, in_app });

    res.json({ success: true });
};