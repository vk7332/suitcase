import express from "express";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { authMiddleware } from "./auth.middleware";

/**
 * Middleware to restrict access based on user role
 * Usage: requireRole(["admin"])
 */

const router = express.Router();

export const requireRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = (req as any).user;

            // 🔒 No user attached
            if (!user) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            // 🔒 No role found
            if (!user.role) {
                return res.status(403).json({ error: "Role not assigned" });
            }

            // 🔒 Role not allowed
            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({
                    error: `Access denied for role: ${user.role}`,
                });
            }

            // ✅ Allowed
            next();
        } catch (err) {
            console.error("Role middleware error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    };
};

/****************************************
 * Example usage in routes:
 ****************************************/

router.post(
    "/admin-only",
    authMiddleware,
    requireRole(["admin"]),
    (req, res) => {
        res.json({ message: "Welcome, Admin!" });
    }
);
router.post(
    "/advocate-only",
    authMiddleware,
    requireRole(["advocate"]),
    (req, res) => {
        res.json({ message: "Welcome, Advocate!" });
    }
);
router.post(
    "/client-only",
    authMiddleware,
    requireRole(["client"]),
    (req, res) => {
        res.json({ message: "Welcome, Client!" });
    }
);
router.post(
    "/client-only",
    authMiddleware,
    requireRole(["client"]),
    (req, res) => {
        res.json({ message: "Welcome, Client!" });
    }
);
router.post(
    "/client-only",
    authMiddleware,
    requireRole(["client"]),
    (req, res) => {
        res.json({ message: "Welcome, Client!" });
    }
);
router.post(
    "/litigent-only",
    authMiddleware,
    requireRole(["litigent"]),
    (req, res) => {
        res.json({ message: "Welcome, Litigent!" });
    }
)
router.post(
    "/public-only",
    authMiddleware,
    requireRole(["public"]),
    (req, res) => {
        res.json({ message: "Welcome, Public!" });
    }
);

export const allowRoles =
    (...roles: string[]) =>
        (req: AuthRequest, res: Response, next: NextFunction) => {
            const user = req.user;

            if (!user || !roles.includes(user.role)) {
                return res.status(403).json({
                    error: "Forbidden: insufficient permissions",
                });
            }

            next();
        };