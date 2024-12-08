import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../config/config.js";

// Store the genres in memory
let genreMap = {};

export const fetchGenresFromTMDB = async () => {
    try {
        // Fetch genres from TMDB
        const { data } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
            params: { api_key: TMDB_API_KEY },
        });

        // Check if genres exist in the response
        if (!data.genres || data.genres.length === 0) {
            console.error("No genres found in TMDB response.");
            throw new Error("No genres returned from TMDB.");
        }

        // Map genre IDs to names for quick lookup
        genreMap = data.genres.reduce((map, genre) => {
            map[genre.id] = genre.name;
            return map;
        }, {});

        // Return the genres as an array
        console.log("Genres fetched from TMDB:", data.genres);
        return data.genres;
    } catch (error) {
        console.error("Error fetching genres from TMDB:", error.message);
        throw new Error("Failed to fetch genres");
    }
};

// Get genre name by ID
export const getGenreNameById = (id) => {
    return genreMap[id] || "Unknown";
};

// Get multiple genre names by an array of IDs
export const getGenreNames = (ids) => {
    return ids.map((id) => getGenreNameById(id));
};
