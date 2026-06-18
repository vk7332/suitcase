import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth-middleware.js";

/**
 * Assumes:
 * req.params.caseId exists
 * You will replace mock with DB query
 */

export const allowCaseAccess = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const user = req.user;
    const { caseId } = req.params;

    // 🔴 PUBLIC cannot access
    if (user.role === "PUBLIC") {
        return res.status(403).json({ error: "Public access denied" });
    }

    // 🟢 ADMIN full access
    if (user.role === "ADMIN") {
        return next();
    }

    // ⚖️ TODO: Replace with DB query
    const isAssigned = true; // simulate check

    if (!isAssigned) {
        return res.status(403).json({
            error: "Not assigned to this case",
        });
    }

    next();
};