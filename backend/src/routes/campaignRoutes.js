import express from "express";
import multer from "multer";

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

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getCampaigns);
router.get("/:slug", getCampaignBySlug);

router.post(
  "/",
  requireAuth,
  adminOnly,
  upload.fields([
    { name: "hero_image_file", maxCount: 1 },
    { name: "gallery_images", maxCount: 3 },
  ]),
  createCampaign
);

router.put(
  "/:slug",
  requireAuth,
  adminOnly,
  upload.fields([
    { name: "hero_image_file", maxCount: 1 },
    { name: "gallery_images", maxCount: 3 },
  ]),
  updateCampaign
);

router.delete("/:slug", requireAuth, adminOnly, deleteCampaign);

export default router;