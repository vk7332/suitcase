import { analyzeCase } from "../services/analytics-service.js";
import { Request, Response } from 'express';
import { judgePattern } from "../services/analytics-service.js";

export const getAnalytics = async (req: Request, res: Response) => {
    const { facts } = req.body;

    const result = await analyzeCase(facts);

    res.json(result);
};

export const getFullAnalytics = async (req: Request, res: Response) => {
    const { facts } = req.body;

    const caseData = await analyzeCase(facts);
    const judgeData = await judgePattern(facts);

    res.json({
        ...caseData,
        judge: judgeData,
    });
};