import express from "express";
import { getDashboard } from "../controllers/dashboard-controller.ts";
import { authMiddleware } from "../middleware/auth-middleware.ts";
import { enforceTenant } from "../middleware/tenant-middleware.ts";
import { allowRoles } from "../middleware/role-middleware.ts";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    enforceTenant,
    allowRoles("ADMIN", "ADVOCATE"),
    getDashboard
);

export default router;