import { supabase } from "../config/supabase";
import { Request, Response } from 'express';
import { getCasesByTenant } from "../services/case.service";

// ==============================
// CREATE CASE
// ==============================
export const createCase = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        const {
            client_id,
            case_title,
            case_number,
            court_name,
        } = req.body;

        if (!case_title) {
            return res.status(400).json({ error: "case_title is required" });
        }

        const { data, error } = await supabase
            .from("cases")
            .insert([
                {
                    client_id,
                    user_id: user.id,
                    case_title,
                    case_number,
                    court_name,
                    status: "active",
                    organization_id: user.organization_id,
                },
            ])
            .select()
            .single();

        if (error) {
            console.error("DB error:", error);
            return res.status(400).json({ error: error.message });
        }

        return res.json(data);
    } catch (err: any) {
        console.error("Create case error:", err);
        return res.status(500).json({ error: "failed to create case" });
    }
};

// ==============================
// GET ALL CASES
// ==============================
export const getCasesByTenantId = async (req: Request, res: Response) => {
    try {
        const tenantId = req.user.tenant_id;
        const cases = await getCasesByTenant(tenantId);
        return res.json(cases);
    } catch (err: any) {
        console.error("Get cases error:", err);
        return res.status(500).json({ error: "failed to fetch cases" });
    }
};

export const getCases = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        const { data, error } = await supabase
            .from("cases")
            .select("*")
            .eq("organization_id", user.organization_id)
            .order("created_at", { ascending: false });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.json(data);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: "failed to fetch cases" });
    }
};

import { initMemory } from "../services/memory.service";

export const startHearing = async (req: Request, res: Response) => {
    const { caseId } = req.body;

    // fetch from DB
    const facts = "Case facts summary here..."; // replace with real DB

    initMemory(caseId, facts);

    res.json({ ok: true });
};

// ==============================
// UPDATE STATUS
// ==============================
export const updateCaseStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const { data, error } = await supabase
            .from("cases")
            .update({ status })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.json(data);
    } catch (err: any) {
        return res.status(500).json({ error: "update failed" });
    }
};