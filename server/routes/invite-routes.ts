import express from "express";
import { createInvite } from "../controllers/invite-controller.ts";
import { requireAuth } from "../middleware/auth-middleware.ts";
import { requireRole } from "../middleware/role-middleware.ts";

const router = express.Router();

router.post(
    "/invite",
    requireAuth,
    requireRole(["admin"]),
    createInvite
);

export default router;