import express from "express";
const router = express();

import userRouter from "./UserRoutes.js";
import photoRouter from "./PhotoRoutes.js";

router.use("/api/users", userRouter);
router.use("/api/photos", photoRouter);

export default router;
