import { getNextLifecycleStep } from "../services/lifecycle-service.ts";
import { Request, Response } from 'express';

export const lifecycle = (req: Request, res: Response) => {
    const { stage } = req.body;

    const next = getNextLifecycleStep(stage);

    res.json({ next });
};