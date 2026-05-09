import express from "express";
import { coCounsel } from "../controllers/cocounsel.controller";

const router = express.Router();

router.post("/co-counsel", coCounsel);

export default router;