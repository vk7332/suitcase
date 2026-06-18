import { convertToWrittenStatement } from "../services/conversion-service.js";
import { Request, Response } from 'express';

export const generateWrittenStatement = async (req: Request, res: Response) => {
    const { sections } = req.body;

    const ws = convertToWrittenStatement(sections);

    res.json({ sections: ws });
};

const respondPara = (para: string) => {
    if (para.toLowerCase().includes("paid")) {
        return "The contents are admitted to the extent of payment, but other allegations are denied.";
    }

    if (para.toLowerCase().includes("breach")) {
        return "The alleged breach is denied.";
    }

    return "The contents are denied for want of knowledge.";
};
