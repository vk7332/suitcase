import {
import { Request, Response } from 'express';
    assignUserToCase,
    getCaseAssignments,
} from "../services/caseAssignment.service";

export const assignUser = async (req: Request, res: Response) => {
    try {
        const { caseId, userId, role } = req.body;

        const data = await assignUserToCase({
            caseId,
            userId,
            role,
        });

        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: "Assignment failed" });
    }
};

export const getAssignments = async (req: Request, res: Response) => {
    try {
        const { caseId } = req.params;

        const data = await getCaseAssignments(caseId);

        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: "Fetch failed" });
    }
};