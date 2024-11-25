import express from "express";
import { getShowtimes } from '../controllers/showtimeController.js';

const router = express.Router();

router.get('/showtimes', getShowtimes);

export default router;