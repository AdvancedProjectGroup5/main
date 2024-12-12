import {fetchMoviesFromTMDB, fetchMovieDetailsFromTMDB} from '../services/movieService.js';
import {fetchDetailedSchedule} from "../services/finnkinoService.js";

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
        console.log("movies from movieController: " + movies.posterUrl)
    } catch (error) {
        next(error);
    }
};

export const getMovieDetails = async (req, res, next) => {
    const {id} = req.params;

    try {
        const movieDetails = await fetchMovieDetailsFromTMDB(id);
        res.status(200).json({
            success: true,
            data: movieDetails,
        });
    } catch (error) {
        next(error);
    }
};



export const getScheduleWithDetails = async (req, res) => {
    const { theatreID, date, language } = req.query;

    if (!theatreID || !date || !language) {
        return res.status(400).json({ error: "Missing required query parameters." });
    }

    try {
        const schedule = await fetchDetailedSchedule(theatreID, date, language);
        res.status(200).json(schedule);
    } catch (error) {
        console.error("Error fetching schedule with details:", error);
        res.status(500).json({ error: "Failed to fetch schedule with details." });
    }
};