import express from "express";
import {
  createCampaign,
  getCampaigns,
  getCampaignBySlug,
  updateCampaign,
  deleteCampaign,
} from "../controllers/campaignController.js";

import { requireAuth } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getCampaigns);
router.get("/:slug", getCampaignBySlug);

router.post("/", requireAuth, adminOnly, createCampaign);
router.put("/:slug", requireAuth, adminOnly, updateCampaign);
router.delete("/:slug", requireAuth, adminOnly, deleteCampaign);

export default router;