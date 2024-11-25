import { fetchShowtimesFromFinnkino } from '../services/showtimeService.js';

export const getShowtimes = async (req, res, next) => {
    try {
        const { theater, date, movieTitle } = req.query;
        const showtimes = await fetchShowtimesFromFinnkino({ theater, date, movieTitle });
        res.status(200).json({
            success: true,
            data: showtimes,
        });
    } catch (error) {
        next(error);
    }
};