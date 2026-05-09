import express from "express";
import { createInvite } from "../controllers/invite.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = express.Router();

router.post(
    "/invite",
    requireAuth,
    requireRole(["admin"]),
    createInvite
);

export default router;