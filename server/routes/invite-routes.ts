import express from "express";
import { createInvite } from "../controllers/invite-controller.js";
import { requireAuth } from "../middleware/auth-middleware.js";
import { requireRole } from "../middleware/role-middleware.js";

const router = express.Router();

router.post(
    "/invite",
    requireAuth,
    requireRole(["admin"]),
    createInvite
);

export default router;