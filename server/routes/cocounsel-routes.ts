import express from "express";
import { coCounsel } from "../controllers/cocounsel-controller.ts";

const router = express.Router();

router.post("/co-counsel", coCounsel);

export default router;