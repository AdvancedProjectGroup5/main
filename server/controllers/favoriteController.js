import { insertFavorite, selectFavoritesByUserId } from "../models/favorite.js"
import { insertSharedFavorite, selectShareTokenByUserId, selectUserIdByShareToken } from "../models/sharedFavorite.js"
import { selectUserById } from "../models/User.js"
import { ApiError } from "../helper/apiError.js"
import { fetchMovieDetailsFromTMDB } from '../services/movieService.js';

const postFavorite = async (req, res, next) => {
    try {
        if (!req.body.userId || !req.body.movieId ) return next(new ApiError('UserID and movieID are necessary.', 400))
        const userId = parseInt(req.body.userId)
        const movieId = parseInt(req.body.movieId)
        const userFromDb = await selectUserById(userId)
        if (userFromDb.rowCount === 0) return next(new ApiError('User not found.', 404))
        await insertFavorite(userId, movieId)
        return res.status(201).json({'message': 'Movie added to favorites successfully.'})
    } catch (error) {
        return next(error)
    }
}

const getFavorites = async (req, res, next) => {
    try {
        if (!req.params.userId) return next(new ApiError('User ID required.', 400))
        const userId = parseInt(req.params.userId)
        const favoritesFromDb = await selectFavoritesByUserId(userId)
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

const postSharedLink = async (req, res, next) => {
    try {
        if (!req.params.userId) return next(new ApiError('User ID required.', 400))
        const userId = parseInt(req.params.userId)
        const selectedShareTokenFromDb = await selectShareTokenByUserId(userId)
        if (selectedShareTokenFromDb.rowCount > 0) return res.status(200).json({'share_token': selectedShareTokenFromDb.rows[0].share_token})
        const insertedShareToken = await insertSharedFavorite(userId)
        return res.status(201).json({'share_token': insertedShareToken.rows[0].share_token})  
    } catch (error) {
        return next(error)
    }
}

const getSharedFavorites = async (req, res, next) => {
    try {
        if (!req.params.shareToken) return next(new ApiError('Share token required.', 400))
        const shareToken = req.params.shareToken
        const userIdFromDb = await selectUserIdByShareToken(shareToken)
        if (userIdFromDb.rowCount === 0) return next(new ApiError('Token not found.', 404))
        const userId = userIdFromDb.rows[0].user_id
        const favoritesFromDb = await selectFavoritesByUserId(userId)
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

const createFavoriteObject = (id, title, genres, release_date) => {
    return {
        'id': id,
        'title': title,
        'genres': genres,
        'release_date': release_date,
    }
}

export { postFavorite, getFavorites, postSharedLink, getSharedFavorites }