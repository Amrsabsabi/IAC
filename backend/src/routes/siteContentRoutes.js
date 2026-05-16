import express from "express";
import multer from "multer";

import {
  getSiteContent,
  updateSiteContent,
} from "../controllers/siteContentController.js";

import { requireAuth } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getSiteContent);

router.put(
  "/",
  requireAuth,
  adminOnly,
  upload.single("home_hero_image_file"),
  updateSiteContent
);

export default router;