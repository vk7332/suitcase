import express from "express";
import multer from "multer";
import { requireAuth } from "../middleware/auth.middleware";
import { downloadAuditPDF, exportAuditLogs, verifyAudit } from "../controllers/audit.controller";
import { requireRole } from "../middleware/role.middleware";
import { upload, uploadDocument, getSignedDocumentUrl } from "../controllers/document.controller";
import { authenticate } from "../middleware/auth.middleware";
import {
    requestOTP,
    signDocument,
} from "../controllers/document.controller";
import { uploadAndConvertDocx } from "../controllers/docx.controller";

const router = express.Router();

const upload = multer(); // memory storage

router.get("/:documentId/url", authenticate, getSignedDocumentUrl);
router.post("/request-otp", requestOTP);
router.post("/sign", signDocument);
router.get("/:id/url", authenticate, getSignedDocumentUrl);
router.get("/:document_id/versions", getDocumentVersions);
router.post("/document/upload", requireAuth, upload.single("file"), uploadDocument);
router.get(
    "/document/:document_id",
    requireAuth,
    getSignedDocumentUrl
);

router.get(
    "/audit/:document_id",
    requireAuth,
    requireRole(["admin"]),
    exportAuditLogs
);

router.post("/convert", upload.single("file"), uploadAndConvertDocx);
router.get("/audit/:document_id", verifyAudit);
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