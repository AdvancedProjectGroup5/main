import { fetchMoviesFromTMDB, fetchMovieDetailsFromTMDB } from '../services/movieService.js';

export const searchMovies = async (req, res, next) => {
    try {
        const { id, title, genre, releaseYear, vote_average } = req.query;
        const movies = await fetchMoviesFromTMDB({ id, title, genre, releaseYear,vote_average });
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
};

export const getMovieDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const movieDetails = await fetchMovieDetailsFromTMDB(id);
        res.status(200).json(movieDetails);
    } catch (error) {
        next(error);
    }
};