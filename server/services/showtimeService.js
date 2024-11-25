import axios from 'axios';
import xml2js from 'xml2js';
import { FINNKINO_BASE_URL } from '../config/config.js'

export const fetchShowtimesFromFinnkino = async ({ theater, date, movieTitle }) => {
    const params = {
        area: theater,
        dt: date,
    };

    const { data: xmlData } = await axios.get(`${FINNKINO_BASE_URL}/Schedule`, { params });

    const parser = new xml2js.Parser();
    const jsonData = await parser.parseStringPromise(xmlData);

    const shows = jsonData.Schedule.Shows[0].Show;

    const processedShowtimes = shows.map((show) => {
        const title = show.Title[0];
        const theaterName = show.Theatre[0];
        const startTime = show.dttmShowStart[0];
        const endTime = show.dttmShowEnd[0];
        const eventID = show.EventID[0];
        const areaID = show.TheatreAuditriumID[0];

        return {title, theaterName, startTime, endTime, eventID, areaID};
    });

    const filteredShowtimes = movieTitle ? processedShowtimes.filter((show) => show.title.toLowerCase().includes(movieTitle.toLowerCase())) : processedShowtimes;

    return filteredShowtimes;
}