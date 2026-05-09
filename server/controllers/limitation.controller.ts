import { detectLimitationFromFacts } from "../services/limitationAI.service";
import { Request, Response } from 'express';
import { calculateFromAI } from "../services/limitation.service";
import { addEvent } from "../services/calendar.service";
import { detectMultipleTriggers } from "../services/limitationAI.service";
import { evaluateTriggers } from "../services/limitation.service";

export const detectLimitation = async (req: Request, res: Response) => {
    const { facts } = req.body;

    const ai = await detectMultipleTriggers(facts);

    const evaluated = evaluateTriggers(
        ai.triggers || [],
        ai.limitation_days
    );

    res.json({
        triggers: evaluated,
        suggested: ai.suggested_primary,
    });
};

export const calculateLimitation = async (req: Request, res: Response) => {
    const { facts } = req.body;
    const result = await calculateFromAI(facts);
    res.json(result);
};

export const addLimitationEvent = async (req: Request, res: Response) => {
    const { case_id, description, date } = req.body;
    const result = await addEvent({ case_id, description, date });
    res.json(result);
};

export const detectLimitationTriggers = async (req: Request, res: Response) => {
    const { facts } = req.body;
    const ai = await detectMultipleTriggers(facts);
    res.json(ai.triggers || []);
};

export const evaluateLimitationTriggers = async (req: Request, res: Response) => {
    const { triggers, limitation_days } = req.body;
    const evaluated = evaluateTriggers(triggers, limitation_days);
    res.json(evaluated);
};
