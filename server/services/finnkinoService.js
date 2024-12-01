import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import {fetchMoviesFromTMDB} from "./movieService.js";
import { FINNKINO_BASE_URL } from '../config/config.js';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchAreas = async () => {
    try {
        await delay(Math.random() * (3000 - 1000) + 1000);

        const response = await axios.get(`${FINNKINO_BASE_URL}/TheatreAreas`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "application/xml",
                "Accept-Language": "en-US,en;q=0.9",
                "Connection": "keep-alive",
                "DNT": "1", // Do Not Track
                "Upgrade-Insecure-Requests": "1",
                "Cache-Control": "no-cache",
                "Pragma": "no-cache",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "same-origin",
            },
        });
        return parseAreas(response.data);
    } catch (error) {
        console.error("Finnkino API Error:", {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers,
        });
        throw new Error("Failed to fetch areas from Finnkino");
    }
};

export const fetchLanguages = async () => {
    try {
        await delay(Math.random() * (3000 - 1000) + 1000);

        const response = await axios.get(`${FINNKINO_BASE_URL}/Languages`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "application/xml",
                "Accept-Language": "en-US,en;q=0.9",
                "Connection": "keep-alive",
                "DNT": "1", // Do Not Track
                "Upgrade-Insecure-Requests": "1",
                "Cache-Control": "no-cache",
                "Pragma": "no-cache",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "same-origin",
            },
        });
        return parseLanguages(response.data);
    } catch (error) {
        console.error("Finnkino API Error:", {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers,
        });
        throw new Error("Failed to fetch languages from Finnkino");
    }
};


export const fetchSchedule = async (theatreID, date, language) => {
    try {
        const url = `${FINNKINO_BASE_URL}/Schedule?area=${theatreID}&dt=${date}&lang=${language}`;
        console.log("Fetching schedule with URL:", url);

        await delay(Math.random() * (3000 - 1000) + 1000);

        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "application/xml",
                "Accept-Language": "en-US,en;q=0.9",
                "Connection": "keep-alive",
                "DNT": "1", // Do Not Track
                "Upgrade-Insecure-Requests": "1",
                "Cache-Control": "no-cache",
                "Pragma": "no-cache",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "same-origin",
            },
        });

        return parseSchedule(response.data);
    } catch (error) {
        console.error("Finnkino API Error (Schedule):", {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers,
        });
        throw new Error("Failed to fetch schedule from Finnkino");
    }
};

const parseAreas = async (xmlData) => {
    const result = await parseStringPromise(xmlData);
    return result.TheatreAreas.TheatreArea.map((area) => ({
        id: area.ID[0],
        name: area.Name[0],
    }));
};

const parseLanguages = async (xmlData) => {
    const result = await parseStringPromise(xmlData);
    console.log("Parsed Languages Data:", result);
    return result.Languages.Language.map((lang) => ({
        code: lang.ID[0],
        name: lang.Name[0],
    }));
};

const parseSchedule = async (xmlData) => {
    const result = await parseStringPromise(xmlData);
    console.log("Parsed Schedule Data:", result);

    if (!result.Schedule || !result.Schedule.Shows[0].Show) {
        throw new Error("No shows found for the given parameters.");
    }

    return result.Schedule.Shows[0].Show.map((show) => ({
        id: show.ID[0],
        title: show.Title[0],
        originalTitle: show.OriginalTitle[0],
        showtime: show.dttmShowStart[0],
        length: show.LengthInMinutes[0],
        theatre: show.Theatre[0],
        auditorium: show.TheatreAuditorium[0],
        spokenLanguage: show.SpokenLanguage?.[0]?.Name?.[0] || "Unknown",
        subtitleLanguage1: show.SubtitleLanguage1?.[0]?.Name?.[0] || "None",
        subtitleLanguage2: show.SubtitleLanguage2?.[0]?.Name?.[0] || "None",
        eventUrl: show.EventURL[0],
        showUrl: show.ShowURL[0],
        imageUrl: show.Images?.[0]?.EventLargeImagePortrait?.[0] || null,
    }));
};


export const fetchDetailedSchedule = async (theatreID, date, language) => {
    const schedule = await fetchSchedule(theatreID, date, language);

    const detailedSchedule = await Promise.all(
        schedule.map(async (show) => {
            try {
                const tmdbMovies = await fetchMoviesFromTMDB({ title: show.title });

                const matchedMovie = tmdbMovies.length > 0 ? tmdbMovies[0] : null;

                return {
                    ...show,
                    tmdbDetails: matchedMovie || null,
                };
            } catch (error) {
                console.error(`Error fetching TMDB details for movie: ${show.title}`, error);
                return { ...show, tmdbDetails: null };
            }
        })
    );

    return detailedSchedule;
};