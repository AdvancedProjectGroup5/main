import { pool } from '../helper/db.js'

const insertFavorite = async (user_id, movie_id) => {
    return await pool.query('INSERT INTO favorites (user_id, movie_id) VALUES ($1, $2)', [user_id, movie_id])
}

const selectFavoritesByUserId = async (user_id) => {
    return await pool.query('SELECT movie_id FROM favorites WHERE user_id = $1', [user_id])
}


export { insertFavorite, selectFavoritesByUserId }