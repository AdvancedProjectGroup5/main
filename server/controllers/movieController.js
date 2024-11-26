import {fetchMoviesFromTMDB, fetchMovieDetailsFromTMDB} from '../services/movieService.js';

export const searchMovies = async (req, res, next) => {
    try {
        const {
            id = null,
            title = '',
            genre_ids = '',
            releaseYear = null,
            vote_average_gte = null,
            vote_average_lte = null,
        } = req.query;

        console.log('Request Query1:', req.query);

        const parsedParams = {
            id,
            title,
            genre_ids,
            releaseYear,
            vote_average_gte: vote_average_gte ? parseFloat(vote_average_gte) : null,
            vote_average_lte: vote_average_lte ? parseFloat(vote_average_lte) : null,
        };

        console.log('Request Query:', req.query);
        console.log('Parsed Parameters:', parsedParams);

        const movies = await fetchMoviesFromTMDB(parsedParams);

        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
};

export const getMovieDetails = async (req, res, next) => {
    try {
        const {id} = req.params;
        const movieDetails = await fetchMovieDetailsFromTMDB(id);
        res.status(200).json(movieDetails);
    } catch (error) {
        next(error);
    }
};