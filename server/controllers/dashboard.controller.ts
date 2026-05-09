import { supabase } from "../config/supabase";
import { Request, Response } from 'express';
import { getDashboardData } from "../services/dashboard.service";

export const getDashboard = async (req: Request, res: Response) => {
    try {
        const { tenantId } = (req as any).user;

        const data = await getDashboardData(tenantId);

        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: "Dashboard failed" });
    }
};

// ⚠️ Replace with DB queries

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const { tenantId } = (req as any).user;
        const chamber_id = (req as any).user.chamber_id;

        const { data: cases } = await supabase
            .from("cases")
            .select("*")
            .eq("chamber_id", chamber_id)
            .limit(5);

        const { data: invoices } = await supabase
            .from("invoices")
            .select("*")
            .eq("chamber_id", chamber_id)
            .limit(5);

        const stats = {
            cases: cases?.length || 0,
            invoices: invoices?.length || 0,
            clients: 0,
            revenue:
                invoices?.reduce((sum: number, i: any) => sum + i.total, 0) || 0,
        };

        // MOCK (replace with real DB)
        const data = {
            totalCases: 24,
            activeCases: 10,
            closedCases: 14,
            advocates: 5,
            clients: 12,
            upcomingHearings: 3,
            stats,
        };

        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
};
