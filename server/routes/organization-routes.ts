import express from "express";
import { createOrganization } from "../controllers/organization-controller.js";
import { requireRole } from "../middleware/role-middleware.js";

const router = express.Router();

// create org (any logged-in user)
router.post("/organization/create", createOrganization);

// optional: restrict later
router.get(
    "/organization/admin-only",
    requireRole(["admin"]),
    (req, res) => {
        res.json({ message: "admin access" });
    }
);

export default router;