import { supabase } from "../config/supabase.js";
import { Request, Response } from 'express';
import { getCasesByTenant } from "../services/case-service.js";

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

import { initMemory } from "../services/memory-service.js";

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

// ==============================
// CASE ACCESS MIDDLEWARE
// ==============================
export const allowCaseAccess = async (req: Request, res: Response, next: any) => {
    try {
        const user = req.user;
        const { caseId } = req.params;

        const { data, error } = await supabase
            .from("cases")
            .select("organization_id")
            .eq("id", caseId)
            .single();

        if (error || !data) {
            return res.status(404).json({ error: "Case not found" });
        }

        if (data.organization_id !== user.organization_id) {
            return res.status(403).json({ error: "Access denied" });
        }

        next();
    } catch (err: any) {
        return res.status(500).json({ error: "Access check failed" });
    }
};

// ==============================
// GENERATE PDF
// ==============================
export const generatePdfController = async (req: Request, res: Response) => {
    try {
        const { caseId } = req.params;

        // This would integrate with a PDF generation service
        // For now, return a placeholder response
        res.json({ message: "PDF generation not yet implemented", caseId });
    } catch (err: any) {
        return res.status(500).json({ error: "PDF generation failed" });
    }
};

// ==============================
// GET CASE DETAILS
// ==============================
export const getCaseDetails = async (req: Request, res: Response) => {
    try {
        const { caseId } = req.params;
        const user = req.user;

        const { data, error } = await supabase
            .from("cases")
            .select("*")
            .eq("id", caseId)
            .eq("organization_id", user.organization_id)
            .single();

        if (error || !data) {
            return res.status(404).json({ error: "Case not found" });
        }

        return res.json(data);
    } catch (err: any) {
        return res.status(500).json({ error: "Failed to fetch case details" });
    }
};

// ==============================
// PUBLIC CASE VIEW
// ==============================
export const publicCaseView = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // This would be for public case viewing with limited information
        // For now, return a placeholder response
        res.json({ message: "Public case view not yet implemented", caseId: id });
    } catch (err: any) {
        return res.status(500).json({ error: "Failed to fetch public case view" });
    }
};