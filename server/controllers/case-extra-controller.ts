import { addEvent, getTimeline } from "../services/timeline-service.ts";
import { Request, Response } from 'express';
import { addHearing, getHearings } from "../services/hearing-service.ts";
import { addDocument, getDocuments } from "../services/dashboard-service.ts";

export const createEvent = async (req: Request, res: Response) => {
    try {
        const data = await addEvent(req.body);
        res.json(data);
    } catch {
        res.status(500).json({ error: "Event failed" });
    }
};

export const fetchTimeline = async (req: Request, res: Response) => {
    const caseId = Array.isArray(req.params.caseId) ? req.params.caseId[0] : req.params.caseId;
    const data = await getTimeline(caseId);
    res.json(data);
};

export const listEvents = fetchTimeline;

export const createHearing = async (req: Request, res: Response) => {
    const data = await addHearing(req.body);
    res.json(data);
};

export const fetchHearings = async (req: Request, res: Response) => {
    const caseId = Array.isArray(req.params.caseId) ? req.params.caseId[0] : req.params.caseId;
    const data = await getHearings(caseId);
    res.json(data);
};

export const uploadDocument = async (req: Request, res: Response) => {
    const data = await addDocument(req.body);
    res.json(data);
};

export const fetchDocuments = async (req: Request, res: Response) => {
    const role = req.user.role;
    const caseId = Array.isArray(req.params.caseId) ? req.params.caseId[0] : req.params.caseId;
    const data = await getDocuments(caseId, role);
    res.json(data);
};
