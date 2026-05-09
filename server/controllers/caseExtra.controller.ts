import { addEvent, getTimeline } from "../services/timeline.service";
import { Request, Response } from 'express';
import { addHearing, getHearings } from "../services/hearing.service";
import { addDocument, getDocuments } from "../services/document.service";

export const createEvent = async (req: Request, res: Response) => {
    try {
        const data = await addEvent(req.body);
        res.json(data);
    } catch {
        res.status(500).json({ error: "Event failed" });
    }
};

export const fetchTimeline = async (req: Request, res: Response) => {
    const data = await getTimeline(req.params.caseId);
    res.json(data);
};

export const createHearing = async (req: Request, res: Response) => {
    const data = await addHearing(req.body);
    res.json(data);
};

export const fetchHearings = async (req: Request, res: Response) => {
    const data = await getHearings(req.params.caseId);
    res.json(data);
};

export const uploadDocument = async (req: Request, res: Response) => {
    const data = await addDocument(req.body);
    res.json(data);
};

export const fetchDocuments = async (req: Request, res: Response) => {
    const role = req.user.role;
    const data = await getDocuments(req.params.caseId, role);
    res.json(data);
};