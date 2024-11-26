import axios from "axios";
import {TMDB_API_KEY, TMDB_BASE_URL} from "../config/config.js";
import {getGenreNames} from "./genreService.js";

export const fetchMoviesFromTMDB = async ({
                                              title,
                                              actor,
                                              genre_ids,
                                              releaseYear,
                                              release_date_gte,
                                              release_date_lte,
                                              language,
                                              vote_average_gte,
                                              vote_average_lte,
                                          }) => {
    let params = {
        api_key: TMDB_API_KEY,
        ...(title && {query: title}),
        ...(genre_ids && {with_genres: genre_ids}),
        ...(releaseYear && {primary_release_year: releaseYear}),
        ...(release_date_gte && {"primary_release_date.gte": release_date_gte}),
        ...(release_date_lte && {"primary_release_date.lte": release_date_lte}),
        ...(language && {with_original_language: language}),
        ...(vote_average_gte != null && {"vote_average.gte": vote_average_gte}),
        ...(vote_average_lte != null && {"vote_average.lte": vote_average_lte}),
    };

    if (actor) {
        const { data: actorData } = await axios.get(`${TMDB_BASE_URL}/search/person`, {
            params: { api_key: TMDB_API_KEY, query: actor },
        });

        if (actorData.results.length > 0) {
            const matchingActor = actorData.results.find((person) =>
                person.name.toLowerCase().includes(actor.toLowerCase())
            );

            if (matchingActor) {
                const actorId = matchingActor.id;
                params = { ...params, with_cast: actorId };
            } else {
                return [];
            }
        } else {
            return [];
        }
    }

    const url = title ? `${TMDB_BASE_URL}/search/movie` : `${TMDB_BASE_URL}/discover/movie`;

    const {data} = await axios.get(url, {params});
    return data.results.map((movie) => ({
        ...movie,
        genres: getGenreNames(movie.genre_ids),
    }));
};

export const fetchMovieDetailsFromTMDB = async (id) => {
    try {
        const {data} = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
            params: {api_key: TMDB_API_KEY},
        });
        return data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error(`Movie with ID ${id} not found.`);
        }
        throw error;
    }
}