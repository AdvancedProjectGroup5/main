import { insertFavorite, selectFavoritesByUserId } from "../models/favorite.js"
import { insertSharedFavorite } from "../models/sharedFavorite.js"
import { selectUserById } from "../models/User.js"
import { ApiError } from "../helper/apiError.js"
import {fetchMoviesFromTMDB, fetchMovieDetailsFromTMDB} from '../services/movieService.js';

const postFavorite = async (req, res, next) => {
    try {
        if (!req.body.userId || !req.body.movieId ) return next(new ApiError('UserID and movieID are necessary.', 400))
        const id = parseInt(req.body.userId)
        const userFromDb = await selectUserById(id)
        if (userFromDb.rowCount === 0) return next(new ApiError('User not found.', 404))
        await insertFavorite(id, req.body.movieId)
        return res.status(201).json({'message': 'Movie added to favorites successfully.'})
    } catch (error) {
        return next(error)
    }
}

const getFavorites = async (req, res, next) => {
    try {
        if (!req.params.userId) return next(new ApiError('User ID required.', 400))
        const id = parseInt(req.params.userId)
        const favoritesFromDb = await selectFavoritesByUserId(id)
        let favorites = []
        for (const favorite of favoritesFromDb.rows) {
            const movieId = favorite.movie_id
            const movieDetails = await fetchMovieDetailsFromTMDB(movieId)
            favorites.push(createFavoriteObject(movieId, movieDetails.title, movieDetails.genres, movieDetails.release_date))
        }
        return res.status(200).json(favorites)
    
    } catch (error) {
        return next(error)
    }
}

const getSharedLink = async (req, res, next) => {
    console.log("まだ")
}

const createFavoriteObject = (id, title, genres, release_date) => {
    return {
        'id': id,
        'title': title,
        'genres': genres,
        'release_date': release_date,
    }
}

export { postFavorite, getFavorites, getSharedLink }