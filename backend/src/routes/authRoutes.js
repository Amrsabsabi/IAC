// import express from "express";
// import { register, login, makeAdmin } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.post("/make-admin", makeAdmin);

// export default router;

import express from "express";
import { register, login, makeAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// مؤقت فقط للتطوير، لاحقاً نحذفها أو نحميها
router.post("/make-admin", makeAdmin);

export default router;