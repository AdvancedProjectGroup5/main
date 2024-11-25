import dotenv from "dotenv";

dotenv.config();

export const TMDB_API_KEY = process.env.TMDB_API_KEY;
export const TMDB_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
export const FINNKINO_BASE_URL = process.env.FINNKINO_BASE_URL || 'https://www.finnkino.fi/xml/';
export const PORT = process.env.PORT || 3001;