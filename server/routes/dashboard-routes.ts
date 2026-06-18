import express from "express";
import { getDashboard } from "../controllers/dashboard-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { enforceTenant } from "../middleware/tenant-middleware.js";
import { allowRoles } from "../middleware/role-middleware.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    enforceTenant,
    allowRoles("ADMIN", "ADVOCATE"),
    getDashboard
);

export default router;