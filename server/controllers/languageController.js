import { fetchSupportedLanguages } from "../services/languageService.js";

export const getLanguages = (req, res, next) => {
    try {
        const languages = fetchSupportedLanguages();
        res.status(200).json(languages);
    } catch (error) {
        next(error);
    }
};