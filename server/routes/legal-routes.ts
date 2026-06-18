import express from "express";
import { getLegalSearch } from "../controllers/legal-search-controller.js";
import { rankCases } from "../controllers/case-ranking-controller.js";
import { askLegalAI } from "../controllers/legal-research-controller.js";

const router = express.Router();

router.get("/legal-search", getLegalSearch);
router.post("/rank-cases", rankCases);
router.post("/legal-research", askLegalAI);

export default router;