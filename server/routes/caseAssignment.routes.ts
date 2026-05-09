import express from "express";
import {
    assignUser,
    getAssignments,
} from "../controllers/caseAssignment.controller";

import { authMiddleware } from "../middleware/auth.middleware";
import { allowRoles } from "../middleware/role.middleware";

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