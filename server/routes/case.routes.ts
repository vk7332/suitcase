// server/routes/case.routes.ts

import express from "express";
import { updateCaseStatus } from "../controllers/case.controller";

const router = express.Router();

router.put("/case/update-status", updateCaseStatus);

export default router;