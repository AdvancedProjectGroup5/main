import axios from "axios";
import {TMDB_API_KEY, TMDB_BASE_URL} from "../config/config.js";
import {getGenreNames} from "./genreService.js";

export const fetchMoviesFromTMDB = async ({
                                              id,
                                              title,
                                              genre_ids,
                                              releaseYear,
                                              vote_average_gte,
                                              vote_average_lte,
                                          }) => {
    const params = {
        api_key: TMDB_API_KEY,
        ...(title && { query: title }),
        ...(genre_ids && { with_genres: genre_ids }),
        ...(releaseYear && { primary_release_year: releaseYear }),
        ...(vote_average_gte !== null && { 'vote_average.gte': vote_average_gte }),
        ...(vote_average_lte !== null && { 'vote_average.lte': vote_average_lte }),
    };

    console.log("TMDB API Parameters:", params);

    const url = title ? `${TMDB_BASE_URL}/search/movie` : `${TMDB_BASE_URL}/discover/movie`;

    const { data } = await axios.get(url, { params });
    return data.results.map((movie) => ({
        ...movie,
        genres: getGenreNames(movie.genre_ids),
    }));
};

export const fetchMovieDetailsFromTMDB = async (id) => {
    try {
        const {data} = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
            params: {api_key: TMDB_API_KEY},
        });
        return data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error(`Movie with ID ${id} not found.`);
        }
        throw error;
    }
}