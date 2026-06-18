import express from "express";
import { getSharedDocument } from "../controllers/client-controller.js";

const router = express.Router();

router.get("/client/document/:token", getSharedDocument);

export default router;