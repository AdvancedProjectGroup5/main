import {fetchMoviesFromTMDB, fetchMovieDetailsFromTMDB} from '../services/movieService.js';

export const searchMovies = async (req, res, next) => {
    try {
        const {
            title = "",
            actor = "",
            genre_ids = "",
            releaseYear = null,
            releaseDate = null,
            release_date_gte = null,
            release_date_lte = null,
            language = "",
            minVote = null,
            maxVote = null,
        } = req.query;

        const date_gte = releaseDate || release_date_gte;
        const date_lte = releaseDate || release_date_lte;

        const movies = await fetchMoviesFromTMDB({
            title,
            actor,
            genre_ids,
            releaseYear,
            release_date_gte: date_gte,
            release_date_lte: date_lte,
            language,
            vote_average_gte: minVote ? parseFloat(minVote) : undefined,
            vote_average_lte: maxVote ? parseFloat(maxVote) : undefined,
        });

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