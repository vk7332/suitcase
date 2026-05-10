// server/routes/case.routes.ts

import express from "express";
import { createCase, updateCaseStatus, allowCaseAccess, generatePdfController, getCaseDetails, publicCaseView } from "../controllers/case.controller";
import { enforcePlan } from "../middleware/plan.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { createOrganization } from "../controllers/organization.controller";
import { createInvite as inviteMember } from "../controllers/invite.controller";
import { requireActiveSubscription as enforceSubscription } from "../middleware/subscription.middleware";
import { allowRoles } from "../middleware/role.middleware";
import { enforceTenant } from "../middleware/tenant.middleware";

const router = express.Router();

router.post(
    "/case/create",
    authMiddleware,        // 🔐 must be first
    enforcePlan("cases"),  // ⚖️ enforce plan
    createCase             // 🎯 actual logic
);

router.post(
    "/:caseId/generate",
    authMiddleware,
    enforceTenant,
    allowRoles("ADVOCATE"),
    allowCaseAccess,
    generatePdfController
);

router.get(
    "/:caseId/view",
    authMiddleware,
    enforceTenant,
    allowRoles("CLIENT", "LITIGENT", "ADVOCATE"),
    allowCaseAccess,
    getCaseDetails
);

router.get(
    "/public-case/:id",
    allowRoles("PUBLIC"),
    publicCaseView
);

router.put("/case/update-status", updateCaseStatus);
router.post("/organization/create", createOrganization);
router.post("/invite", inviteMember);
router.post("/case/create", enforceSubscription, createCase);

export default router;