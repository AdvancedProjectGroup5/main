import express from 'express';
import { getAreas, getLanguages, getSchedule } from '../controllers/showtimesController.js';
import {getScheduleWithDetails} from "../controllers/movieController.js";

const router = express.Router();

router.get('/areas', getAreas);

router.get('/languages', getLanguages);

router.get('/schedule', getSchedule);

router.get("/detailed-schedule", getScheduleWithDetails);

export default router;

