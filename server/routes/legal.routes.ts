import express from "express";
import { getLegalSearch } from "../controllers/legalSearch.controller";
import { rankCases } from "../controllers/caseRanking.controller";
import { askLegalAI } from "../controllers/legalResearch.controller";

const router = express.Router();

router.get("/legal-search", getLegalSearch);
router.post("/rank-cases", rankCases);
router.post("/legal-research", askLegalAI);

export default router;