// server/routes/share.routes.ts

import express from "express";
import { createShareLink, accessSharedDocument } from "../controllers/share-controller.ts";

const router = express.Router();

router.post("/share", createShareLink);
router.get("/share/:token", accessSharedDocument);

export default router;