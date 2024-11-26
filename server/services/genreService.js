import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../config/config.js";

let genreMap = {};

export const fetchGenresFromTMDB = async () => {
    try {
        const { data } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
            params: { api_key: TMDB_API_KEY },
        });
        genreMap = data.genres.reduce((map, genre) => {
            map[genre.id] = genre.name;
            return map;
        }, {});
    } catch (error) {
        console.error("Error fetching genres from TMDB:", error.message);
        throw new Error("Failed to fetch genres");
    }
};

export const getGenreNameById = (id) => {
    return genreMap[id] || "Unknown";
};

export const getGenreNames = (ids) => {
    return ids.map((id) => getGenreNameById(id));
};
