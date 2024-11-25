import axios from "axios";
import {TMDB_API_KEY, TMDB_BASE_URL} from "../config/config.js";

export const fetchMoviesFromTMDB = async ({id, title, genre, releaseYear, vote_average}) => {
    const params = {
        api_key: TMDB_API_KEY,
        id: id,
        query: title,
        with_genres: genre,
        primary_release_year: releaseYear,
        rate: vote_average,
    };

    const {data} = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
        headers: {Authorization: `Bearer ${TMDB_API_KEY}`},
        params
    });
    return data.results;
};

export const fetchMovieDetailsFromTMDB = async (id) => {
    const {data} = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
        params: {api_key: TMDB_API_KEY},
    });
    return data;
}