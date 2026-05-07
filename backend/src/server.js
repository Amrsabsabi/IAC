import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import authRoutes from "./routes/authRoutes.js";
import { requireAuth } from "./middleware/authMiddleware.js";
import { adminOnly } from "./middleware/adminMiddleware.js";
import campaignRoutes from "./routes/campaignRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "IAC backend is running" });
});

app.get("/test-db", async (req, res) => {
  const { data, error } = await supabase.from("test").select("*");

  if (error) return res.status(500).json(error);

  res.json(data);
});

app.use("/api/auth", authRoutes);

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

app.get(
  "/api/admin/dashboard",
  requireAuth,
  adminOnly,
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

app.use("/api/campaigns", campaignRoutes);
app.use("/api/admin/campaigns", campaignRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});