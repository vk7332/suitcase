import express from "express";
import { requireAuth, authenticate } from "../middleware/auth-middleware.js";
import { downloadAuditPDF, exportAuditLogs, verifyAudit } from "../controllers/audit-controller.js";
import { requireRole } from "../middleware/role-middleware.js";
import {
    upload,
    uploadDocument,
    getSignedDocumentUrlHandler,
    getDocumentVersions,
    requestOTP,
    signDocument,
} from "../controllers/document-controller.js";
import { uploadAndConvertDocx } from "../controllers/docx-controller.js";

const router = express.Router();

router.get("/:documentId/url", authenticate, getSignedDocumentUrlHandler);
router.post("/request-otp", requestOTP);
router.post("/sign", signDocument);
router.get("/:document_id/versions", authenticate, getDocumentVersions);
router.post("/document/upload", requireAuth, upload.single("file"), uploadDocument);
router.get(
    "/document/:document_id",
    requireAuth,
    getSignedDocumentUrlHandler
);

router.get(
    "/audit/:document_id",
    requireAuth,
    requireRole(["admin"]),
    exportAuditLogs
);

router.post("/convert", upload.single("file"), uploadAndConvertDocx);
router.post(
    "/upload",
    authenticate,
    upload.single("file"),
    uploadDocument
);

router.get(
    "/audit/pdf/:document_id",
    requireAuth,
    requireRole(["admin"]),
    downloadAuditPDF
);

router.get("/verify/:id", verifyAudit);

export default router;