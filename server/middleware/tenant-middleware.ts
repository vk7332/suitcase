import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth-middleware.js";

export const enforceTenant = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const user = req.user;

    if (!user?.tenantId) {
        return res.status(403).json({
            error: "Tenant access required",
        });
    }

    // attach tenantId to request
    (req as any).tenantId = user.tenantId;

    next();
};