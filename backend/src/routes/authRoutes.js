import express from "express";

import { requireAuth } from "../middleware/authMiddleware.js";
import { getMe, syncProfile } from "../controllers/authController.js";

const router = express.Router();

router.get("/me", requireAuth, getMe);
router.post("/sync-profile", requireAuth, syncProfile);

export default router;