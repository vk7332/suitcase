import express from "express";
import { downloadAuditReport } from "../controllers/audit-controller.js";
import { authenticate } from "../middleware/auth-middleware.js";
import { parseCertificate } from "../utils/certificate-util.js";

const router = express.Router();

router.post("/parse-cert", (req, res) => {
    const { certificate } = req.body;
    const certInfo = parseCertificate(certificate);
    res.json(certInfo);
});

router.get("/report", authenticate, downloadAuditReport);

export default router;