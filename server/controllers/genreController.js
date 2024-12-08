import { fetchGenresFromTMDB } from "../services/genreService.js";

export const getGenres = async (req, res, next) => {
    try {
        const genres = await fetchGenresFromTMDB();
        res.status(200).json(genres);
    } catch (error) {
        next(error);
    }
};