import express from "express";
import {
    assignUser,
    getAssignments,
} from "../controllers/case-assignment-controller.js";

import { authMiddleware } from "../middleware/auth-middleware.js";
import { allowRoles } from "../middleware/role-middleware.js";

const router = express.Router();

// 👨‍⚖️ only advocate/admin can assign
router.post(
    "/assign",
    authMiddleware,
    allowRoles("ADVOCATE", "ADMIN"),
    assignUser
);

// 📄 view assignments
router.get(
    "/:caseId",
    authMiddleware,
    getAssignments
);

export default router;