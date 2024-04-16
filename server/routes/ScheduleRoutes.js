import express from "express";
import { ScheduleImageController } from "../controllers/index.js";

const router = express.Router();

router.post("/create", ScheduleImageController.createScheduleImage);
// router.patch("/update", ScheduleControllers.updateSchedule)
router.get("/scheduleone", ScheduleImageController.findLastElement);
router.get("/getAll", ScheduleImageController.findAllElements);
export default router;
