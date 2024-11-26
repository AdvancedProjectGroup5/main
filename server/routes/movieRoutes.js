import express from 'express';
import { searchMovies, getMovieDetails } from '../controllers/movieController.js';

const router = express.Router();

router.get('/search', searchMovies);
// router.get('/discover', searchMovies);
router.get('/:id', getMovieDetails);

export default router;
