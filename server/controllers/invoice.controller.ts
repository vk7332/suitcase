import { supabase } from "../config/supabase";
import { Request, Response } from 'express';

export const createInvoice = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        const { case_id, amount } = req.body;

        const gstRate = 0.18;
        const cgst = amount * 0.09;
        const sgst = amount * 0.09;

        const total = amount + cgst + sgst;

        const { data, error } = await supabase
            .from("invoices")
            .insert([
                {
                    case_id,
                    chamber_id: user.chamber_id,
                    amount,
                    cgst,
                    sgst,
                    total,
                    status: "generated",
                },
            ])
            .select()
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json(data);
    } catch (err: any) {
        console.error("Invoice error:", err);
        res.status(500).json({ error: "invoice failed" });
    }
};