import express from "express";
import { getDashboard } from "../controllers/dashboard.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { enforceTenant } from "../middleware/tenant.middleware";
import { allowRoles } from "../middleware/role.middleware";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    enforceTenant,
    allowRoles("ADMIN", "ADVOCATE"),
    getDashboard
);

export default router;