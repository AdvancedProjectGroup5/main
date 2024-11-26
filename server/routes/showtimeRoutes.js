import express from 'express';
import { getAreas, getLanguages, getSchedule } from '../controllers/showtimesController.js';

const router = express.Router();

router.get('/areas', getAreas);

router.get('/languages', getLanguages);

router.get("/schedule", getSchedule);

export default router;
