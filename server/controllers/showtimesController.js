import { fetchAreas, fetchLanguages, fetchSchedule } from '../services/finnkinoService.js';

export const getAreas = async (req, res, next) => {
    try {
        const areas = await fetchAreas();
        res.status(200).json(areas);
    } catch (error) {
        next(error);
    }
};

export const getLanguages = async (req, res, next) => {
    try {
        const languages = await fetchLanguages();
        res.status(200).json(languages);
    } catch (error) {
        next(error);
    }
};

export const getSchedule = async (req, res, next) => {
    try {
        const { theatreID, date, language } = req.query;
        if (!theatreID || !date) {
            return res.status(400).json({ error: "TheatreID and date are required." });
        }
        const schedule = await fetchSchedule(theatreID, date, language);
        res.status(200).json(schedule);
    } catch (error) {
        next(error);
    }
};
