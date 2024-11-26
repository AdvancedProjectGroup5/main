import axios from 'axios';
import { parseStringPromise } from 'xml2js';

export const fetchAreas = async () => {
    try {
        const response = await axios.get("https://www.finnkino.fi/xml/TheatreAreas", {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "application/xml",
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
        const response = await axios.get("https://www.finnkino.fi/xml/Languages", {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "application/xml",
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
        const url = `https://www.finnkino.fi/xml/Schedule?area=${theatreID}&dt=${date}&lang=${language}`;
        console.log("Fetching schedule with URL:", url);

        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "application/xml",
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
    console.log("Parsed Languages Data:", result); // 检查实际数据结构
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
